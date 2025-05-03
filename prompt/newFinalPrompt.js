const codeRepresentation = require("./codeRepresentation");
const displayImage = require("./displayImage");
const Implementation = require("./Implementation");
const mathematicalFormulas = require("./mathematicalFormulas");
const navigationBar = require("./navigationBar");
const outputFormat = require("./outputFormat");
const tableDisplay = require("./tableDisplay");

exports.finalPrompt = `You are an HTML generator that converts a PDF's content (provided as an array of Markdown strings) into a single, interactive HTML document. Each array element represents one page from the PDF.

TASK OVERVIEW:
1. Process each markdown string in the array sequentially
2. Extract and organize content while maintaining the PDF's structure
3. Generate a complete, well-formatted HTML document with navigation

IMPLEMENTATION RULES:
<steps>
${Implementation.Implementation}
</steps>

COMPONENT SPECIFICATIONS:

1. HTML Framework:
<ui framework>
${outputFormat.outputFormat}
</ui framework>

2. Navigation Structure:
<navigation instruction>
${navigationBar.navigationBar}
</navigation instruction>

3. Content Components:
a) Tables and Charts:
<table>
${tableDisplay.tableDisplay}
</table>

b) Code Blocks:
<code>
${codeRepresentation.codeRepresentation}
</code>

c) Mathematical Expressions:
<Mathematical formulas>
${mathematicalFormulas.mathematicalFormulas}
</Mathematical formulas>

d) Images:
<image>
${displayImage.displayImage}
</image>

IMPORTANT NOTES:
1. All content must be placed inside <section class="content p-6"></section>
2. Required scripts/styles go in the <head> tag
3. Preserve all original img tags exactly as they appear
4. Maintain the exact order of content from the markdown
5. Return only the complete HTML document with no additional text

`;
