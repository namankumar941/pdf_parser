require("dotenv").config();
const { Mistral } = require("@mistralai/mistralai");
const ValidationClass = require("./validationClass");
const mistralApiKey = process.env.MISTRAL_API_KEY;

//----------------------------------------------class----------------------------------------------

class MistralApiClass {
  constructor() {
    this.client = new Mistral({ apiKey: mistralApiKey });
    this.validationClass = new ValidationClass();
    this.cancel = false;
  }
  async mistralApi(pdfArray, filename) {
    const promiseArray = [];
    for (const index in pdfArray) {
      promiseArray.push(
        this.makeApiCall(pdfArray[index], `${filename} ${index + 1}`)
      );
    }

    let result = [];
    try {
      result = await Promise.all(promiseArray);
    } catch (err) {
      this.cancel = true;
      console.log(err);
      return {
        success: false,
        error: "Please try again later.",
      };
    }

    return {
      success: true,
      result: result,
    };
  }

  async makeApiCall(uploadedFile, filename) {
    if (this.cancel) {
      throw new Error("Cancelled before start");
    }
    let result = { markdowns: [], imagesList: [] };
    let loopNo = 0;
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

    while (loopNo < 3) {
      if (this.cancel) {
        throw new Error("Cancelled during processing");
      }
      loopNo++;
      try {
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
          loopNo = 4;
        }
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

    return result;
  }
}
module.exports = MistralApiClass;
