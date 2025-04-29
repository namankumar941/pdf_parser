const fs = require("fs");

const MistralApiClass = require("./mistralApi");
const ClaudeAiApi = require("./claudeAiApi");
const OpenAiApi = require("./openAiApi");
const ReplaceImageTagClass = require("./replaceImageTag");
//----------------------------------------------class----------------------------------------------

class PageView {
  async getUploadPdf(req, res) {
    return res.render("uploadPdf");
  }

  async postUploadPdf(req, res) {
    //created class instance
    const mistralApiClass = new MistralApiClass();

    const ocrResponse = await mistralApiClass.mistralApi(req.file.filename);

    let markdowns = ocrResponse.markdowns;
    let imagesList = ocrResponse.imagesList;

    fs.writeFileSync(
      "markdowns.json",
      JSON.stringify(markdowns, null, 2),
      "utf-8"
    );
    fs.writeFileSync(
      "imagesList.json",
      JSON.stringify(imagesList, null, 2),
      "utf-8"
    );

    let uiOutput;
    const apiChoice = req.body.apiChoice;

    if (apiChoice === "openai") {
      const openAiApi = new OpenAiApi();
      uiOutput = await openAiApi.openAiApi(markdowns);
    } else if (apiChoice === "claude") {
      const claudeAiApi = new ClaudeAiApi();
      uiOutput = await claudeAiApi.claudeApi(markdowns);
    } else {
      return res.status(400).send("Invalid API choice");
    }

    const replaceImageTagClass = new ReplaceImageTagClass();
    const updatedHtml = replaceImageTagClass.replaceImageTag(
      uiOutput,
      imagesList
    );
    return res.send(updatedHtml);
  }
}

module.exports = PageView;
