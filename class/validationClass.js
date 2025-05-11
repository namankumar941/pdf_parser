const { z } = require("zod");
//----------------------------------------------class----------------------------------------------

class validationClass {
  validation(htmlString) {
    // Validate HTML response
    if (
      !htmlString.startsWith("<!DOCTYPE html>") ||
      !htmlString.includes("</html>")
    ) {
      return 1;
    }
    return 0;
  }
  zValidation(page) {
    const mySchema = z.object({
      index: z.number(),
      markdown: z.string(),
      images: z.any(),
      dimensions: z.any(),
    });
    return mySchema.safeParse(page).success;
  }
}

module.exports = validationClass;
