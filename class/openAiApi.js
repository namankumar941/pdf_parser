require("dotenv").config();
const OpenAI = require("openai");
const ValidationClass = require("./validationClass");
const FixJsonBackslashesClass = require("./fixJsonBackslashes");
const openaiApiKey = process.env.OPENAI_API_KEY;
//----------------------------------------------class----------------------------------------------
const responseFormat = {
  type: "json_schema",
  json_schema: {
    name: "document_structure",
    schema: {
      type: "object",
      properties: {
        head: {
          type: "array",
          items: {
            type: "string",
          },
        },
        body: {
          type: "array",
          items: {
            type: "object",
            properties: {
              heading: {
                type: "string",
              },
              content: {
                oneOf: [
                  {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        subheading: {
                          type: "string",
                        },
                        content: {
                          oneOf: [
                            {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  "sub-subheading": {
                                    type: "string",
                                  },
                                  content: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                },
                                required: ["sub-subheading", "content"],
                                additionalProperties: false,
                              },
                            },
                          ],
                        },
                      },
                      required: ["subheading", "content"],
                      additionalProperties: false,
                    },
                  },
                ],
              },
            },
            required: ["heading", "content"],
            additionalProperties: false,
          },
        },
        bodyScript: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["head", "body", "bodyScript"],
      additionalProperties: false,
    },
  },
};
class OpenAiClass {
  constructor() {
    this.openaiClient = new OpenAI({ apiKey: openaiApiKey });
    this.fixJsonBackslashesClass = new FixJsonBackslashesClass();
    this.validationClass = new ValidationClass();
  }
  async formatOcrMarkdownWithOpenAI(markdowns) {
    const systemPrompt = `You are a Markdown formatting assistant.
  - Given poorly formatted Markdown file, analyze and understand content inside markdown then assign appropriate #, ## or ### tags according to the content inside the markdown file.
  - Do not alter original content of markdown file.
  - Return only the updated Markdown file without any explanation or other text.`;
    const userPrompt = `only markdown file in response no other explanation text.
              Here is the content: ${markdowns}`;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const accumulatedText = await this.streamOpenAIResponse(
          systemPrompt,
          userPrompt,
          "gpt-4.1"
        );
        return accumulatedText;
      } catch (error) {
        if (attempt === 2) {
          throw new Error(error);
        }
      }
    }
  }
  async streamOpenAIResponse(systemPrompt, userPrompt, model) {
    let accumulatedText = "";

    const stream = await this.openaiClient.responses.create({
      model: model,
      temperature: 1,
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.type === "response.output_text.delta") {
        accumulatedText += chunk.delta;
      }
    }
    return accumulatedText;
  }
  async openAiApi(markdown, model, systemPrompt) {
    // Create message content
    const userMessage = `markdown string is: ${markdown}, and output in JSON format with keys: "head" (list of strings), "body" (list of dicts with "heading" and "content") and "bodyScript" ( list of strings) `;

    try {
      const jsonRes = await this.makeApiCallWithRetries(
        systemPrompt,
        userMessage,
        model
      );
      return jsonRes;
    } catch (error) {
      throw new Error(error);
    }
  }
  async makeApiCallWithRetries(systemPrompt, userMessage, model) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const jsonRes = await this.OpenAIResponse(
          systemPrompt,
          userMessage,
          model
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
        console.log("error11111", error);
        if (attempt === 2) {
          throw new Error(error);
        }
        if (error.message.includes("rate") || error.response?.status === 429) {
          console.log("1234", error);
          // const waitTime = parseInt(error.headers["retry-after"], 10) * 1000;
          await new Promise((resolve) => setTimeout(resolve, 10000));
          continue;
        }
      }
    }
  }
  async OpenAIResponse(systemPrompt, userPrompt, model) {
    const response = await this.openaiClient.chat.completions.create({
      model: model,
      temperature: 1,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: responseFormat,
    });
    let parsedData = this.fixJsonBackslashesClass.fixJsonBackslashes(
      response.choices[0].message.content
    );
    return JSON.parse(parsedData);
  }
}

module.exports = OpenAiClass;
