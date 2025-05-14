const codeRepresentation = require("./codeRepresentation");
const displayImage = require("./displayImage");
const Implementation = require("./Implementation");
const mathematicalFormulas = require("./mathematicalFormulas");
const outputFormat = require("./outputFormat");
const tableDisplay = require("./tableDisplay");

exports.finalPrompt = `<prompt>
  <task>
    - Pass a Markdown string and Generate HTML code for this Markdown string and return a json object as per the <returnFormat> tag.
    - Only return a valid JSON object. Do not include any explanation or text outside the JSON object.
    - Respond with raw JSON as plain text only, no code formatting, no triple backticks, and no language tags.
    - Must follow the structure as explained in <returnFormat> tag.
  </task>

${outputFormat}

${Implementation}

Content Components:
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

<notes>
    1. Use only Tailwind classes—no custom CSS.  
    2. Do not alter original Markdown content.  
    3. Return only the JSON object.  
    4. Do not wrap “body” in body&gt;—only &lt;div&gt; containers.  
    5. Do not wrap head elements in &lt;head&gt;—return raw &lt;link&gt;/&lt;script&gt; tags.  
    6. Preserve all original &lt;img&gt; tags exactly.
    7. Respond with raw JSON as plain text only, no code formatting, no triple backticks, and no language tags.
    8. do not alter ant text inside markdown string while placing it inside response json
    </notes>
</prompt>
`;

const mindmap = `<components>
    <mindmap>
      Generate a mind map of the Markdown content and display it above its section, styled with Tailwind.
    </mindmap>
  </components>
`;
