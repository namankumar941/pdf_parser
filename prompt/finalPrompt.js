const Implementation = require("./Implementation");
const dataVerify = require("./dataVerify");
const example = require("./example");

exports.finalPrompt = `Markdown to React Interactive UI using Shadcn UI and Tailwind CSS
🛠️ Task Description

- You are a web designer developing a React-based HTML interface that converts Markdown content into an interactive, visually appealing UI.
- Input: An array of Markdown strings, each representing one page of a PDF. Output: A visually enhanced, component-driven HTML using Shadcn UI components and Tailwind CSS.
- IMPORTANT: Every single piece of data from the original Markdown strings must be preserved and displayed in the output. Completeness is the top priority.

📜 Implementation Instructions

## Core Requirements-
- Follow the example provided below exactly.
- Preserve 100% of the original Markdown content and meaning - no data may be omitted.
- if image tag is present in markdown string then it should be added in my final response at the same location.
- Use MDX format for responses, allowing embedding of React components.
- Create a consistent user interface with proper visual hierarchy.

## Technical Requirements-
You must use:
- Tailwind CSS with variable-based colors (like bg-primary, text-primary-foreground)
- Shadcn UI components for UI elements
- Lucide React icons where appropriate
- Responsive design principles
- Each content element from the Markdown should be properly wrapped inside an appropriate React or Shadcn UI component.

## Data Processing Requirements-

### Complete Data Processing: 
- Process and display EVERY piece of data from EVERY Markdown string
### Data Verification: 
- Before finalizing your response, verify that all original data points are present in your output and all image tag are added at their respective position.
### Data Integrity: 
- Ensure numerical values, dates, and other specific information remain unchanged

🎨 Styling Rules

- Prefer Shadcn UI components when possible
- Use Tailwind CSS colors through variables (avoid direct color codes unless necessary)
- Use white background by default. Use wrappers for different backgrounds
- Support dark mode by toggling the dark class
- Ensure text legibility in both light and dark modes

♿ Accessibility

- Use semantic HTML tags (main, header, etc.)
- Add appropriate ARIA roles and attributes
- Use the sr-only class for screen-reader-only text
- Ensure all images have alt text (unless purely decorative)

${Implementation}

${dataVerify}

${example}`;
