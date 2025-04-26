require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const { map } = require("zod");

const finalOutputJsonSchema = {
  format: {
    type: "json_schema",
    name: "merged_html_output",
    schema: {
      type: "object",
      properties: {
        html: { type: "string" },
      },
      required: ["html"],
      additionalProperties: false,
    },
    strict: true,
  },
};

const finalPrompt = require("./prompt");
//----------------------------------------------class----------------------------------------------

class OpenAiClass {
  async openAiApi(markdowns) {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey: openaiApiKey });
    const response = await openai.responses.create({
      model: "gpt-4o-2024-08-06",
      input: [
        {
          role: "system",
          content: finalPrompt,
        },
        {
          role: "user",
          content: `Markdown array: ${markdowns} `,
        },
      ],
      text: finalOutputJsonSchema,
    });
    console.log("ui generated using openai api");
    const event = JSON.parse(response.output_text);
    console.log("event", event);
    return event;
  }
}

module.exports = OpenAiClass;
