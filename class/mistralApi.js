require("dotenv").config();

const fs = require("fs");
const { z } = require("zod");
const { Mistral } = require("@mistralai/mistralai");

//----------------------------------------------class----------------------------------------------

class MistralApiClass {
  async mistralApi(filename) {
    let loop = 1;
    let loopNo = 0;
    const mistralApiKey = process.env.MISTRAL_API_KEY;

    const client = new Mistral({ apiKey: mistralApiKey });

    const uploadedFile = fs.readFileSync(`./public/pdf/${filename}`);

    const uploadedPdf = await client.files.upload({
      file: {
        fileName: `${filename}`,
        content: uploadedFile,
      },
      purpose: "ocr",
    });

    const signedUrl = await client.files.getSignedUrl({
      fileId: uploadedPdf.id,
    });

    let markdowns = [];
    let imagesList = [];

    const mySchema = z.object({
      index: z.number(),
      markdown: z.string(),
      images: z.any(),
      dimensions: z.any(),
    });
    while (loop && loopNo < 3) {
      console.log("enter");
      loopNo++;
      const ocrResponse = await client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: signedUrl.url,
        },
        includeImageBase64: true,
      });

      if (mySchema.safeParse(ocrResponse.pages[0]).success) {
        loop = 0;

        fs.writeFileSync(
          "mistral_output.json",
          JSON.stringify(ocrResponse, null, 2),
          "utf-8"
        );
        for (const page of ocrResponse.pages) {
          markdowns.push(page.markdown);
          imagesList.push(page.images);
        }
        console.log("finish");
      }
    }

    return { markdowns: markdowns, imagesList: imagesList };
  }
}
module.exports = MistralApiClass;
