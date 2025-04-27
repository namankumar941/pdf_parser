const splitPage = require("./splitPage");
const navigationBar = require("./navigationBar");
const searchBar = require("./searchBar");
const mainData = require("./mainData");
const outputFormat = require("./outputFormat");

const ui = `
${splitPage}

${navigationBar}

${searchBar}

${mainData}

${outputFormat}
`;

exports.Implementation = `📋 Implementation Process

1. Content Analysis & Structuring
- Thoroughly analyze ALL Markdown content before beginning conversion
- Identify and categorize all content elements:
- Headings (all levels: #, ##, etc.)
- Paragraphs
- Lists (ordered and unordered)
- Tables
- Blockquotes
- Code blocks
- Images
- Map out the complete document structure before starting conversion.

2. Complete Data Extraction
- Extract 100% of content from all Markdown strings
- Create a structured inventory of all headings, subheadings, data tables, and key data points
- Cross-check extracted data against the original Markdown to ensure completeness

3. Componentization
- Split Markdown into logical sections based on content hierarchy
- Wrap sections with appropriate Shadcn UI containers (Card, Panel, Sheet)
- Ensure each component properly displays its content without truncation

4. Content Conversion
- Convert ALL Markdown elements to their React/JSX equivalents
- Use appropriate Shadcn UI components for each content type:
- Tables → Shadcn Table component
- Images → Responsive image in Shadcn Card
- Code Blocks → Syntax-highlighted code in Shadcn Card
- Blockquotes → Styled quote in appropriate container
- Preserve the semantic hierarchy and meaning of all content

5. UI Layout Implementation
${ui}`;
