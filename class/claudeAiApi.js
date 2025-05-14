require("dotenv").config();

const { Anthropic } = require("@anthropic-ai/sdk");
const ValidationClass = require("./validationClass");
const FixJsonBackslashesClass = require("./fixJsonBackslashes");

// Claude API configuration
const CLAUDE_CONFIG = {
  model: "claude-3-7-sonnet-20250219",
  temperature: 1,
  max_tokens: 5000,
  stream: true,
};
const apiKey = process.env.CLAUDE_API_KEY;
//----------------------------------------------class----------------------------------------------

class ClaudeClass {
  constructor() {
    this.claudClient = new Anthropic({ apiKey });
    this.fixJsonBackslashesClass = new FixJsonBackslashesClass();
    this.validationClass = new ValidationClass();
  }
  async claudeApi(markdown, systemPrompt) {
    try {
      const userMessage = `markdown string is: ${markdown}, and output in JSON format with keys: "head" (list of strings), "body" (list of dicts with "heading" and "content") and "bodyScript" ( list of strings) `;
      const jsonRes = this.makeApiCallWithRetries(userMessage, systemPrompt);
      return jsonRes;
    } catch (error) {
      throw new Error(error);
    }
  }
  async makeApiCallWithRetries(userMessage, systemPrompt) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const jsonRes = await this.streamClaudeResponse(
          userMessage,
          systemPrompt
        );

        if (this.validationClass.jsonResponseValidation(jsonRes)) {
          return jsonRes;
        } else {
          if (attempt === 2) {
            throw new Error(
              "Failed to generate valid UI. Please try again later or use a different agent."
            );
          }
        }
      } catch (error) {
        if (attempt === 2) {
          throw new Error(error);
        }
        if (error.message.includes("rate") || error.response?.status === 429) {
          console.log("enter");
          const waitTime = parseInt(error.headers["retry-after"], 10) * 1000;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
      }
    }
  }

  async streamClaudeResponse(userMessage, systemPrompt) {
    let accumulatedText = "";
    const stream = await this.claudClient.messages.stream({
      ...CLAUDE_CONFIG,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userMessage }],
    });

    for await (const chunk of stream) {
      if (chunk.type === "content_block_delta") {
        accumulatedText += chunk.delta.text;
      }
    }
    let parsedData =
      this.fixJsonBackslashesClass.fixJsonBackslashes(accumulatedText);
    return JSON.parse(parsedData);
  }
}

module.exports = ClaudeClass;
