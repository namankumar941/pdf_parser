require("dotenv").config();
const MistralApiClass = require("./mistralApi");
const ReplaceImageTagClass = require("./replaceImageTag");
const fs = require("fs");
const HandleAiApiSelectionClass = require("./handleAiApiSelection");
const HtmlviewClass = require("./htmlView");

const fss = require("fs").promises;

//----------------------------------------------class----------------------------------------------

class PageViewClass {
  constructor() {
    this.handleAiApiSelectionClass = new HandleAiApiSelectionClass();
    this.replaceImageTagClass = new ReplaceImageTagClass();
    this.htmlviewClass = new HtmlviewClass();
    this.mistralApiClass = new MistralApiClass();
  }
  async getUploadPdf(req, res) {
    return res.render("uploadPdf");
  }

  async postUploadPdf(req, res) {
    try {
      if (1) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        console.log(`1. ${hours}:${minutes}:${seconds}`);
      }
      // Process the uploaded PDF using Mistral OCR to extract text and structure
      const ocrResponse = await this.processUploadedPdfWithMistralOcr(
        req.file.filename
      );

      const finalJson =
        await this.handleAiApiSelectionClass.handleAiApiSelection(
          ocrResponse.markdowns,
          req.body.apiChoice
        );
      // const finalJson = await this.openAiApiClass.openAiApi(
      //   ocrResponse.markdowns.join("\n"),
      //   "gpt-4.1",
      //   systemPrompt.finalPrompt
      // );
      console.log("finalJson11111111", finalJson);

      if (1) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        console.log(`2. ${hours}:${minutes}:${seconds}`);
      }
      const fullUiHtmlCode = this.htmlviewClass.htmlview(finalJson);
      const imagesList = ocrResponse.imagesList.flat();
      const updatedHtml = this.replaceImageTagClass.replaceImageTag(
        fullUiHtmlCode,
        imagesList
      );
      fss.writeFile("./output2.html", updatedHtml, "utf-8");
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
}

module.exports = PageViewClass;
