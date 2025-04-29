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
  async makeApiCall(client, userMessage, attempt = 1) {
    try {
      const stream = await client.messages.stream({
        ...CLAUDE_CONFIG,
        system: `${newFinalPrompt.finalPrompt}`,
        messages: [{ role: "user", content: userMessage }],
      });

      let accumulatedText = "";
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta") {
          accumulatedText += chunk.delta.text;
        }
      }

      const htmlString = accumulatedText.trim();
      
      // Validate HTML response
      if (!htmlString.startsWith("<!DOCTYPE html>")) {
        throw new Error("Invalid response: Expected HTML string");
      }

      if (!htmlString.includes("</html>")) {
        throw new Error("Incomplete HTML: Missing closing </html> tag");
      }

      return htmlString;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt < 3) {
        console.log(`Retrying... Attempt ${attempt + 1}/3`);
        // Wait for 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        return this.makeApiCall(client, userMessage, attempt + 1);
      }
      
      throw new Error("Please try again after some time. Service is temporarily unavailable.");
    }
  }

  async claudeApi(markdowns) {
    const apiKey = process.env.CLAUDE_API_KEY;
    const client = new Anthropic({ apiKey });

    // Create message content
    const userMessage = `IMPORTANT: Return ONLY HTML code, nothing else.
Input markdown array to convert:
markdownArray = ${markdowns}
`;

    try {
      const htmlString = await this.makeApiCall(client, userMessage);
      console.log("UI generated using Claude API");
      console.log("Raw response:", htmlString);
      return htmlString;
    } catch (error) {
      console.error("All retry attempts failed:", error);
      throw error;
    }
  }
}

module.exports = ClaudeClass;
