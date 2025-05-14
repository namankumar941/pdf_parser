const OpenAIClass = require("./openAiApi");
const ClaudeAiApiClass = require("./claudeAiApi");
const systemPrompt = require("../prompt/newFinalPrompt");
const fs = require("fs");
//----------------------------------------------class----------------------------------------------

class HandleAiApiSelectionClass {
  constructor() {
    this.claudeAiApiClass = new ClaudeAiApiClass();
    this.openAiApiClass = new OpenAIClass();
  }
  async handleAiApiSelection(markdownChunks) {
    console.log(markdownChunks.length);
    try {
      let promiseArray = [];
      for (const chunk of markdownChunks) {
        const contentIdentification = this.hasMarkdownElements(chunk);
        if (contentIdentification.hasTable) {
          promiseArray.push(
            this.claudeAiApiClass.claudeApi(chunk, systemPrompt.finalPrompt)
          );
        } else if (
          contentIdentification.hasCodeBlock ||
          contentIdentification.hasInlineMath
        ) {
          promiseArray.push(
            this.openAiApiClass.openAiApi(
              chunk,
              "gpt-4.1",
              systemPrompt.finalPrompt
            )
          );
        } else {
          promiseArray.push(
            this.openAiApiClass.openAiApi(
              chunk,
              "gpt-4.1",
              systemPrompt.finalPrompt
            )
          );
        }
      }
      const promiseAllResponse = await Promise.all(promiseArray);
      fs.writeFileSync(
        "promiseAllResponse.json",
        JSON.stringify(promiseAllResponse, null, 2),
        "utf-8"
      );
      const finalJson = promiseAllResponse.reduce((merged, curr) => {
        for (const key in curr) {
          if (!merged[key]) merged[key] = [];
          merged[key] = merged[key].concat(curr[key]);
        }
        return merged;
      }, {});
      return finalJson;
    } catch (error) {
      console.log("111", error);
      throw new Error(error);
    }
  }
  hasMarkdownElements(markdown) {
    const tableRegex =
      /^ *\|?.+?\|.*\n *\|? *[:\-]+[:\-| ]*\n(?: *\|?.+\|.*\n?)*/gm;

    const codeBlockRegex =
      /(^ {4}.*(\n {4}.*)*)|(^\s*```[\s\S]*?```)|(^\s*~~~[\s\S]*?~~~)/gm;

    const inlineMathRegex = /(?<!\$)\$(?!\$)([\s\S]*?[^\\])\$(?!\$)/g;

    const blockMathRegex =
      /(\$\$[\s\S]*?\$\$)|\\\[([\s\S]*?)\\\]|\\begin\{[a-zA-Z*]+\}[\s\S]*?\\end\{[a-zA-Z*]+\}/g;

    return {
      hasTable: tableRegex.test(markdown),
      hasCodeBlock: codeBlockRegex.test(markdown),
      hasInlineMath:
        inlineMathRegex.test(markdown) || blockMathRegex.test(markdown),
    };
  }
}

module.exports = HandleAiApiSelectionClass;
