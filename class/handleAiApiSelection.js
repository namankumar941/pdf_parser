const OpenAIClass = require("./openAiApi");
const ClaudeAiApiClass = require("./claudeAiApi");
const systemPrompt = require("../prompt/newFinalPrompt");
//----------------------------------------------class----------------------------------------------

class HandleAiApiSelectionClass {
  constructor() {
    this.claudeAiApiClass = new ClaudeAiApiClass();
    this.openAiApiClass = new OpenAIClass();
  }
  async handleAiApiSelection(markdown, apiChoice) {
    try {
      if (apiChoice === "openai") {
        const finalJson = await this.openAiApiClass.openAiApi(
          markdown,
          "gpt-4.1",
          systemPrompt.finalPrompt
        );
        return finalJson;
      } else {
        const finalJson = await this.claudeAiApiClass.claudeApi(
          markdown,
          systemPrompt.finalPrompt
        );
        return finalJson;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = HandleAiApiSelectionClass;
