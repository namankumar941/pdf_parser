const codeRepresentation = require("./codeRepresentation");
const dataVerify = require("./dataVerify");
const example = require("./example");
const functionality = require("./functionality");
const Implementation = require("./Implementation");
const mathematicalFormulas = require("./mathematicalFormulas");
const navigationBar = require("./navigationBar");
const outputFormat = require("./outputFormat");
const tableDisplay = require("./tableDisplay");

exports.finalPrompt = `You are an HTML generator that converts an array of Markdown strings (each element is one “page”) into a single, complete HTML document. Follow these steps inside <steps></steps> tags exactly—do not deviate or omit:
<steps>
${Implementation.Implementation}
</steps>

<ui example> 
${example.example}
</ui example>

<functionality>
${functionality.functionality}
</functionality>

<navigation instruction>
${navigationBar.navigationBar}
</navigation instruction>

<table>
${tableDisplay.tableDisplay}
</table>

<code >
${codeRepresentation.codeRepresentation}
</code >

<Mathematical formulas>
${mathematicalFormulas.mathematicalFormulas}
</Mathematical formulas>


RESPONSE FORMAT:
${outputFormat.outputFormat}
`;
