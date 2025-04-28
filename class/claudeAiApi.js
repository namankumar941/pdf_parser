require("dotenv").config();

const { Anthropic } = require("@anthropic-ai/sdk");

// Claude API configuration
const CLAUDE_CONFIG = {
  model: "claude-3-sonnet-20240229",
  temperature: 1,
  max_tokens: 4096,
};
const newFinalPrompt = require("../prompt/newFinalPrompt");
//----------------------------------------------class----------------------------------------------

class ClaudeClass {
  async claudeApi(markdowns) {
    const apiKey = process.env.CLAUDE_API_KEY;
    const claude = new Anthropic({ apiKey });

    // Create message content
    const userMessage = `IMPORTANT: Return ONLY HTML code, nothing else.
Input markdown array to convert:
markdownArray = ${markdowns}
`;

    // Make API call
    const response = await claude.messages.create({
      ...CLAUDE_CONFIG,
      system: `${newFinalPrompt.finalPrompt}`,
      messages: [{ role: "user", content: userMessage }],
    });
    console.log("UI generated using Claude API");
    let htmlString = response.content[0].text;
    console.log("Raw response:", htmlString);

    // Clean up the response
    htmlString = htmlString.trim();

    // Validate if the response starts with <!DOCTYPE html> to ensure it's HTML
    if (!htmlString.trim().startsWith("<!DOCTYPE html>")) {
      throw new Error("Invalid response: Expected HTML string");
    }

    return htmlString;
  }
}

module.exports = ClaudeClass;
