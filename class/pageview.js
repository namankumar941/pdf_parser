require("dotenv").config();
const MistralApiClass = require("./mistralApi");
const OpenAiApiClass = require("./openAiApi");
const ReplaceImageTagClass = require("./replaceImageTag");
const fs = require("fs");
const HandleAiApiSelectionClass = require("./handleAiApiSelection");
const HtmlviewClass = require("./htmlView");
//----------------------------------------------class----------------------------------------------

class PageViewClass {
  constructor() {
    this.handleAiApiSelectionClass = new HandleAiApiSelectionClass();
    this.replaceImageTagClass = new ReplaceImageTagClass();
    this.openAiApiClass = new OpenAiApiClass();
    this.htmlviewClass = new HtmlviewClass();
    this.mistralApiClass = new MistralApiClass();
  }
  async getUploadPdf(req, res) {
    return res.render("uploadPdf");
  }

  async postUploadPdf(req, res) {
    try {
      // Process the uploaded PDF using Mistral OCR to extract text and structure
      const ocrResponse = await this.processUploadedPdfWithMistralOcr(
        req.file.filename
      );
      // Format the extracted OCR text into clean markdown using OpenAI
      const markdown = await this.openAiApiClass.formatOcrMarkdownWithOpenAI(
        ocrResponse.markdowns.join("\n")
      );

      // Split the markdown content into chunks based on headings for easier processing
      const markdownChunks = this.splitMarkdownByHeading(markdown);

      const finalJson =
        await this.handleAiApiSelectionClass.handleAiApiSelection(
          markdownChunks
        );

      const fullUiHtmlCode = this.htmlviewClass.htmlview(finalJson);
      const imagesList = ocrResponse.imagesList.flat();
      const updatedHtml = this.replaceImageTagClass.replaceImageTag(
        fullUiHtmlCode,
        imagesList
      );
      return res.send(updatedHtml);
    } catch (error) {
      console.log(error);
      return res.send({ success: false, error: "Please try again later" });
    }
  }
  // Processes the uploaded PDF using Mistral OCR and returns the extracted content
  async processUploadedPdfWithMistralOcr(fileName) {
    try {
      const uploadedFile = fs.readFileSync(`./public/pdf/${fileName}`);
      const ocrResponse = await this.mistralApiClass.mistralApi(
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
}

module.exports = PageViewClass;
