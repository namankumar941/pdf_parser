require("dotenv").config();
const { Mistral } = require("@mistralai/mistralai");
const ValidationClass = require("./validationClass");
const mistralApiKey = process.env.MISTRAL_API_KEY;

//----------------------------------------------class----------------------------------------------

class MistralApiClass {
  constructor() {
    this.client = new Mistral({ apiKey: mistralApiKey });
    this.validationClass = new ValidationClass();
  }
  async mistralApi(uploadedFile, filename) {
    try {
      const signedUrl = await this.uploadAndSignedUrl(uploadedFile, filename);
      const result = this.makeApiCallWithRetries(signedUrl);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Please try again later");
    }
  }
  async uploadAndSignedUrl(uploadedFile, filename) {
    const uploadedPdf = await this.client.files.upload({
      file: {
        fileName: `${filename}`,
        content: uploadedFile,
      },
      purpose: "ocr",
    });

    const signedUrl = await this.client.files.getSignedUrl({
      fileId: uploadedPdf.id,
    });
    return signedUrl;
  }
  async makeApiCallWithRetries(signedUrl) {
    let loopNo = 0;

    while (loopNo < 3) {
      loopNo++;
      try {
        const result = await this.mistralApiCall(signedUrl);
        return result;
      } catch (error) {
        if (error.message.includes("rate") || error.response?.status === 429) {
          const delay = 1000 * loopNo;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        } else {
          console.log(error);
        }
      }

      if (loopNo == 3) {
        throw new Error("Please try again later");
      }
    }
  }

  async mistralApiCall(signedUrl) {
    try {
      let result = { markdowns: [], imagesList: [] };
      const ocrResponse = await this.client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: signedUrl.url,
        },
        includeImageBase64: true,
      });
      if (this.validationClass.zValidation(ocrResponse.pages[0])) {
        for (const page of ocrResponse.pages) {
          result.markdowns.push(page.markdown);
          result.imagesList.push(page.images.flat());
        }
        return { imagesList: result.imagesList, markdowns: result.markdowns };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = MistralApiClass;
