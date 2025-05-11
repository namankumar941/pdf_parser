const MistralApiClass = require("./mistralApi");
const ClaudeAiApi = require("./claudeAiApi");
const OpenAiApi = require("./openAiApi");
const ReplaceImageTagClass = require("./replaceImageTag");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
//----------------------------------------------class----------------------------------------------

class PageView {
  async getUploadPdf(req, res) {
    return res.render("uploadPdf");
  }

  async postUploadPdf(req, res) {
    const ocrResponse = await this.chunkPdfIntoPairs(
      `./public/pdf/${req.file.filename}`,
      req.file.filename
    );

    if (!ocrResponse.success) {
      return res.send(ocrResponse);
    }

    const uiOutput = await this.handleAiApiSelection(
      ocrResponse.markdowns,
      req.body.apiChoice
    );
    if (!uiOutput.success) {
      return res.send(uiOutput);
    }

    const replaceImageTagClass = new ReplaceImageTagClass();
    const updatedHtml = replaceImageTagClass.replaceImageTag(
      uiOutput.accumulatedText,
      ocrResponse.imagesList
    );
    return res.send(updatedHtml);
  }

  async chunkPdfIntoPairs(filePath, fileName) {
    const pdfBytes = fs.readFileSync(filePath);
    const originalPdf = await PDFDocument.load(pdfBytes);

    try {
      const res = await this.splitAndSendPdfChunksToMistral(
        originalPdf,
        fileName
      );

      const markdowns = res.map((obj) => obj.markdowns).flat();
      const imagesList = res
        .map((obj) => obj.imagesList)
        .flat(2)
        .filter(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            Object.keys(item).length > 0
        );

      return {
        success: true,
        markdowns: markdowns,
        imagesList: imagesList,
      };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Please try again later" };
    }
  }
  async splitAndSendPdfChunksToMistral(originalPdf, fileName) {
    const mistralApiClass = new MistralApiClass(this.claudeClient);
    const totalPages = originalPdf.getPageCount();
    const chunkPromises = Array.from(
      { length: Math.ceil(totalPages / 2) },
      (_, idx) => {
        return (async () => {
          const newPdf = await PDFDocument.create();
          const i = idx * 2;
          const pagesToCopy = [i, i + 1].filter((p) => p < totalPages);
          const copiedPages = await newPdf.copyPages(originalPdf, pagesToCopy);
          copiedPages.forEach((page) => newPdf.addPage(page));
          const chunkBuffer = await newPdf.save();
          return mistralApiClass.mistralApi(
            Buffer.from(chunkBuffer),
            `${fileName} ${i}`
          );
        })();
      }
    );
    const res = await Promise.all(chunkPromises);
    return res;
  }
  async handleAiApiSelection(markdowns, apiChoice) {
    if (apiChoice === "openai") {
      const openAiApi = new OpenAiApi();
      const uiOutput = await openAiApi.openAiApi(markdowns);
      return uiOutput;
    } else {
      const claudeAiApi = new ClaudeAiApi();
      const uiOutput = await claudeAiApi.claudeApi(markdowns);
      return uiOutput;
    }
  }
}

module.exports = PageView;
