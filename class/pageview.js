require("dotenv").config();
const OpenAI = require("openai");
const MistralApiClass = require("./mistralApi");
const ClaudeAiApi = require("./claudeAiApi");
const OpenAiApi = require("./openAiApi");
const ReplaceImageTagClass = require("./replaceImageTag");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
//----------------------------------------------class----------------------------------------------

class PageView {
  constructor() {
    this.openAiApi = new OpenAiApi();
  }
  async getUploadPdf(req, res) {
    return res.render("uploadPdf");
  }

  async postUploadPdf(req, res) {
    try {
      // Process the uploaded PDF using Mistral OCR to extract text and structure
      const ocrResponse = await this.processUploadedPdfWithOcr(
        req.file.filename
      );
      // Format the extracted OCR text into clean markdown using OpenAI
      const markdowns = await this.openAiApi.formatOcrMarkdownWithOpenAI(
        ocrResponse.markdowns.join("\n")
      );
      // Split the markdown content into chunks based on headings for easier processing
      const markdownChunks = this.splitMarkdownByHeading(markdowns);

      // const uiOutput = await this.handleAiApiSelection(
      //   ocrResponse.markdowns,
      //   req.body.apiChoice
      // );

      // const replaceImageTagClass = new ReplaceImageTagClass();
      // const updatedHtml = replaceImageTagClass.replaceImageTag(
      //   uiOutput.accumulatedText,
      //   ocrResponse.imagesList
      // );
      // return res.send(updatedHtml);
    } catch (error) {
      console.log(error);
      return res.send({ success: false, error: "Please try again later" });
    }
  }
  // Processes the uploaded PDF using Mistral OCR and returns the extracted content
  async processUploadedPdfWithOcr(fileName) {
    try {
      const mistralApiClass = new MistralApiClass();
      const uploadedFile = fs.readFileSync(`./public/pdf/${fileName}`);
      const ocrResponse = await mistralApiClass.mistralApi(
        uploadedFile,
        fileName
      );

      return ocrResponse;
    } catch (error) {
      throw new Error(error);
    }
  }
  // Splits markdown text into chunks based on the specified heading level
  splitMarkdownByHeading(markdown, headingLevel = 1) {
    const headingPrefix = "#".repeat(headingLevel);
    const regex = new RegExp(`^(${headingPrefix} .+)`, "gm");
    const matches = [...markdown.matchAll(regex)];

    const chunks = [];
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index;
      const end =
        i + 1 < matches.length ? matches[i + 1].index : markdown.length;
      const chunk = markdown.slice(start, end).trim();
      chunks.push(chunk);
    }

    return chunks;
  }

  async handleAiApiSelection(markdowns, apiChoice) {
    try {
      if (apiChoice === "openai") {
        const openAiApi = new OpenAiApi();
        const uiOutput = await openAiApi.openAiApi(markdowns);
        return uiOutput;
      } else {
        const claudeAiApi = new ClaudeAiApi();
        const uiOutput = await claudeAiApi.claudeApi(markdowns);
        return uiOutput;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PageView;
