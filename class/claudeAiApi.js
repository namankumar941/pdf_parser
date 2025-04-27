require("dotenv").config();

const { Anthropic } = require("@anthropic-ai/sdk");

// Claude API configuration
const CLAUDE_CONFIG = {
  model: "claude-3-sonnet-20240229",
  temperature: 0.7,
  max_tokens: 4000,
};
const requirement = require("../prompt/requirement");
const finalPrompt = require("../prompt/newFinalPrompt");
//----------------------------------------------class----------------------------------------------

class ClaudeClass {
  async claudeApi(markdowns) {
    const apiKey = process.env.CLAUDE_API_KEY;
    const claude = new Anthropic({ apiKey });
    // Create message content
    const messageContent = `${finalPrompt}\n\nMarkdown array: ${markdowns} \n\n ${requirement} \n\n output in JSON format with key: html(string)`;

    // Make API call
    const response = await claude.messages.create({
      ...CLAUDE_CONFIG,
      messages: [{ role: "user", content: messageContent }],
    });

    console.log("ui generated using claude api");
    console.log("response.content[0].text", response.content[0].text);
    const event = JSON.parse(response.content[0].text);
    console.log("event", event);
    return event;
  }
}

module.exports = ClaudeClass;
