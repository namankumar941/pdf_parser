require("dotenv").config();

const { Anthropic } = require("@anthropic-ai/sdk");

// Claude API configuration
const CLAUDE_CONFIG = {
  model: "claude-3-7-sonnet-20250219",
  temperature: 1,
  max_tokens: 64000,
  stream: true
};
const newFinalPrompt = require("../prompt/newFinalPrompt");
//----------------------------------------------class----------------------------------------------

class ClaudeClass {
  async claudeApi(markdowns) {
    const apiKey = process.env.CLAUDE_API_KEY;
    const client = new Anthropic({ apiKey });

    // Create message content
    const userMessage = `IMPORTANT: Return ONLY HTML code, nothing else.
Input markdown array to convert:
markdownArray = ${markdowns}
`;
    let accumulatedText = "";

    try {
      // Make API call and wait for all chunks
      const stream = await client.messages.stream({
        ...CLAUDE_CONFIG,
        system: `${newFinalPrompt.finalPrompt}`,
        messages: [{ role: "user", content: userMessage }],
      });

      // Process the stream
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta") {
          accumulatedText += chunk.delta.text;
        }
      }
      console.log(accumulatedText);
      console.log("UI generated using Claude API");
      const htmlString = accumulatedText.trim();
      console.log("Raw response:", htmlString);

      // Validate if the response starts with <!DOCTYPE html> to ensure it's HTML
      if (!htmlString.startsWith("<!DOCTYPE html>")) {
        throw new Error("Invalid response: Expected HTML string");
      }

      // Additional validation for complete HTML
      if (!htmlString.includes("</html>")) {
        throw new Error("Incomplete HTML: Missing closing </html> tag");
      }

      return htmlString;
    } catch (error) {
      console.error("Error in Claude API call:", error);
      throw error;
    }
  }
}

module.exports = ClaudeClass;
