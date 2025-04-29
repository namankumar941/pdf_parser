require("dotenv").config();

const { Anthropic } = require("@anthropic-ai/sdk");
const ValidationClass = require("./validationClass");

// Claude API configuration
const CLAUDE_CONFIG = {
  model: "claude-3-7-sonnet-20250219",
  temperature: 1,
  max_tokens: 64000,
  stream: true,
};
const newFinalPrompt = require("../prompt/newFinalPrompt");
//----------------------------------------------class----------------------------------------------

class ClaudeClass {
  async claudeApi(markdowns) {
    const validationClass = new ValidationClass();

    // Create message content
    const userMessage = `IMPORTANT: Return ONLY HTML code, nothing else.
                          Input markdown array to convert:
                          markdownArray = ${markdowns}`;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const accumulatedText = await this.makeApiCall(userMessage);
        const trimmedText = accumulatedText.trim();

        // Validate the response
        const validationError = validationClass.validation(trimmedText);

        if (!validationError) {
          return {
            success: true,
            accumulatedText: trimmedText,
          };
        } else {
          if (attempt === 2) {
            return {
              success: false,
              error:
                "Failed to generate valid UI. Please try again later or use a different agent.",
            };
          }
        }
      } catch (error) {
        if (attempt === 2) {
          return {
            success: false,
            error:
              "The service is temporarily unavailable. Please try again later or use a different agent.",
          };
        }
      }
    }
    return {
      success: false,
      error:
        "The service is temporarily unavailable. Please try again later or use a different agent.",
    };
  }

  async makeApiCall(userMessage) {
    let accumulatedText = "";

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      throw new Error("Claude API key is not configured");
    }

    const client = new Anthropic({ apiKey });
    const stream = await client.messages.stream({
      ...CLAUDE_CONFIG,
      system: newFinalPrompt.finalPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    for await (const chunk of stream) {
      if (chunk.type === "content_block_delta") {
        accumulatedText += chunk.delta.text;
      }
    }
    return accumulatedText;
  }
}

module.exports = ClaudeClass;
