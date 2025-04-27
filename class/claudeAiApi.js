require("dotenv").config();

const { Anthropic } = require("@anthropic-ai/sdk");

// Claude API configuration
const CLAUDE_CONFIG = {
  model: "claude-3-sonnet-20240229",
  temperature: 0.7,
  max_tokens: 4000,
};

const finalPrompt = require("./prompt");
//----------------------------------------------class----------------------------------------------

class ClaudeClass {
  async claudeApi(markdowns) {
    const apiKey = process.env.CLAUDE_API_KEY;
    const claude = new Anthropic({ apiKey });
    // Create message content
    const messageContent = `${finalPrompt}\n\nMarkdown array: ${markdowns}\n\nRequired Components:\n1. Split page layout with navigation bar on left and content on right\n2. Navigation bar must show all headings and subheadings\n3. Search bar in the top-right of main content\n4. Implement dropdown functionality for navigation\n5. Smooth scrolling to sections\n\nEnsure the output includes:\n- All necessary CSS styles\n- Complete navigation structure\n- Search functionality\n- Proper event listeners for navigation and search\n- Preserved markdown content in the main area\n\n output in JSON format with key: html(string)`;

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
