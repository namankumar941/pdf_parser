const tableDisplay = require("./tableDisplay");
const mathematicalFormulas = require("./mathematicalFormulas");
const codeRepresentation = require("./codeRepresentation");

exports.mainData = `
Step 6: Main Content Rendering
- Strictly follow the example provided to display content in markdown array. And make sure all content is diplayed in final output.
- Display ALL processed Markdown content in the main area
- Render each content type with its appropriate Shadcn component
- Apply consistent spacing, typography, and visual styling
- Verify that ALL original content is displayed correctly
- make sure no data is left behind.
- ${tableDisplay}
- ${mathematicalFormulas}
- ${codeRepresentation}`;
