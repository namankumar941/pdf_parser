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
      const ocrResponse = await this.processUploadedPdfWithOcr(
        req.file.filename
      );
      const markdowns = await this.openAiApi.formatOcrMarkdownWithOpenAI(
        ocrResponse.markdowns.join("\n")
      );

      fs.writeFile("README2.md", markdowns, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Markdown file created successfully.");
        }
      });

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
