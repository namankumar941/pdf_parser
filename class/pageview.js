const fs = require("fs");
const { z } = require("zod");

const MistralApiClass = require("./mistralApi");
const OpenAiClass = require("./openAiApi");
const ReplaceImageTagClass = require("./replaceImageTag");
//----------------------------------------------class----------------------------------------------

class PageView {
  async getUploadPdf(req, res) {
    console.log("start123");
    // return res.send("done");
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

    //created class instance
    const openAiClass = new OpenAiClass();

    const uiOutput = await openAiClass.openAiApi(markdowns);

    fs.writeFileSync("output.json", JSON.stringify(uiOutput, null, 2), "utf-8");

    const replaceImageTagClass = new ReplaceImageTagClass();
    replaceImageTagClass.replaceImageTag(uiOutput, imagesList);
    return res.send(uiOutput.html);
  }
}

module.exports = PageView;
