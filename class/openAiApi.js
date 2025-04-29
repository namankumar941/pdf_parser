require("dotenv").config();
const OpenAI = require("openai");
const newFinalPrompt = require("../prompt/newFinalPrompt");
const ValidationClass = require("./validationClass");
//----------------------------------------------class----------------------------------------------

class OpenAiClass {
  async openAiApi(markdowns) {
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
          console.log("HTML generation successful");
          return {
            success: true,
            accumulatedText: trimmedText,
          };
        } else {
          console.log("Validation failed:", validationError);
          if (attempt === 2) {
            return {
              success: false,
              error:
                "Failed to generate valid UI. Please try again later or use a different agent.",
            };
          }
        }
      } catch (error) {
        console.error("API call error:", error);
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

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error("Claude API key is not configured");
    }
    const openai = new OpenAI({ apiKey: openaiApiKey });

    const stream = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "system",
          content: newFinalPrompt.finalPrompt,
        },
        {
          role: "user",
          content: userMessage,
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
