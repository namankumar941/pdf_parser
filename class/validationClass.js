const { z } = require("zod");
//----------------------------------------------class----------------------------------------------

class validationClass {
  jsonResponseValidation(jsonRes) {
    const contentLeafSchema = z.string();

    const subSubSectionSchema = z.object({
      "sub-subheading": z.string(),
      content: z.array(contentLeafSchema),
    });

    const subSectionSchema = z.object({
      subheading: z.string(),
      content: z.array(z.union([subSubSectionSchema, contentLeafSchema])),
    });

    const sectionSchema = z.object({
      heading: z.string(),
      content: z.array(z.union([subSectionSchema, contentLeafSchema])),
    });
    const mySchema = z.object({
      head: z.array(z.string()),
      body: z.array(sectionSchema),
      bodyScript: z.array(z.string()),
    });
    return mySchema.safeParse(jsonRes).success;
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
