require("dotenv").config();
const OpenAI = require("openai");
const newFinalPrompt = require("../prompt/newFinalPrompt");
const ValidationClass = require("./validationClass");
//----------------------------------------------class----------------------------------------------

class OpenAiClass {
  async openAiApi(markdowns) {
    const validationClass = new ValidationClass();
    // Create message content
    const userPrompt = `IMPORTANT: Return ONLY HTML code, nothing else.
                          Input markdown array to convert:
                          markdownArray = ${markdowns}`;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const accumulatedText = await this.streamOpenAIResponse(
          newFinalPrompt.finalPrompt,
          userPrompt,
          "gpt-4.1"
        );
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
  async formatOcrMarkdownWithOpenAI(markdowns) {
    const systemPrompt = `You are a Markdown formatting assistant.
  - Given poorly formatted Markdown file, analyze and assign appropriate heading and subheadings tags according to the content inside the markdown file.
  - Do not alter original content of markdown file.
  - Return only the updated Markdown file without any explanation or other text.`;
    const userPrompt = `only markdown file in response no other explanation text.
              Here is the content: ${markdowns}`;
    try {
      const accumulatedText = await this.streamOpenAIResponse(
        systemPrompt,
        userPrompt,
        "gpt-4o"
      );
      return accumulatedText;
    } catch (error) {
      throw new Error(error);
    }
  }
  async streamOpenAIResponse(systemPrompt, userPrompt, model) {
    let accumulatedText = "";

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error("openai API key is not configured");
    }
    const openai = new OpenAI({ apiKey: openaiApiKey });

    const stream = await openai.responses.create({
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
}

module.exports = OpenAiClass;
