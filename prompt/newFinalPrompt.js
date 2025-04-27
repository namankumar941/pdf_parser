const splitPage = require("./splitPage");
const navigationBar = require("./navigationBar");
const searchBar = require("./searchBar");
const tableDisplay = require("./tableDisplay");

exports.finalPrompt = `Extract and Display Markdown Data in Interactive UI

PROCESS:
1. Extract structured data from markdown array
2. Organize data into categories (text, tables, lists, images)
3. Convert to interactive HTML UI

INPUT: Array of Markdown strings (each representing a PDF page)
OUTPUT: Single-page interactive HTML with the following structure:

1. LAYOUT (Required)
   - Two-panel split layout
   - Left panel: Fixed-width navigation sidebar
   - Right panel: Main content area
   - Search bar fixed at top-right of main content

2. NAVIGATION (Required)
   - Extract ALL headings/subheadings from markdown
   - Create collapsible navigation menu
   - Clicking heading shows/hides subheadings
   - Clicking any item scrolls to content
   - Highlight active section

3. SEARCH (Required)
   - Search bar in top-right corner
   - Highlight matching text
   - Show match count
   - Next/Previous match navigation

4. DATA EXTRACTION & DISPLAY (Required)
   a) Extract Data:
      - Identify and extract all data types:
        * Headings and subheadings
        * Tables and structured data
        * Lists and bullet points
        * Key-value pairs
        * Images and their captions
        * Code blocks
        * Quotes and citations
   
   b) Process & Organize:
      - Convert tables to structured JSON
      - Group related data under headings
      - Map relationships between data points
      - Identify metrics and numerical data
   
   c) Enhanced Display:
      - Present data in organized sections
      - Convert tables to interactive components:
        * Clean, responsive table display
        * Automatic chart generation (Bar, Pie, Line)
        * Card-based layout for metrics
      - Create data hierarchies:
        * Collapsible sections
        * Nested relationships
        * Connected data points
      - Interactive elements:
        * Sortable tables
        * Filterable lists
        * Expandable details

STYLING:
- Use provided example styles
- Keep layout responsive
- Ensure dark mode support

${splitPage}
${navigationBar}
${searchBar}
${tableDisplay}

OUTPUT FORMAT:
Return JSON: { "html": "<complete html with ALL required components>" }

VERIFICATION:
- ALL data is correctly extracted and categorized
- Data relationships are preserved and displayed
- Tables are converted to both display formats (table + chart)
- Navigation shows complete data hierarchy
- Search works across all extracted data
- Interactive features are functional
- Layout matches example`;
