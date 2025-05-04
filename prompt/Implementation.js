const dataVerify = require("./dataVerify");
exports.Implementation = `INITIALIZATION:
1. Use the exact HTML structure from <ui framework></ui framework> tag
2. Keep all <head> content from the framework
3. Add required libraries in <head>:
   - MathJax for formulas
   - Prism.js for code highlighting
   - Highcharts, ECharts, or D3.js for data visualization
4. Initialize empty navigation structure
5. Create main content section with class="content p-6"

PROCESSING LOOP:
<for>
for(let i = 0; i < markdownArray.length; i++) {
  // Process each markdown string sequentially
  1. Parse current markdown string (markdownArray[i])
  2. Extract headings/subheadings for navigation:
     - Add to navigation as per <navigation instruction></navigation instruction>
     - Use proper heading IDs for linking
  
  3. Process special content (in order of appearance):
     <if>
     a) Tables:
        - Convert markdown tables to HTML with Tailwind styling
        - Generate appropriate charts using Chart.js
        - Follow examples in <table></table> tag
     </if>
     <if>
     b) Code Blocks:
        - Use Prism.js for syntax highlighting
        - Maintain original formatting and comments
        - Follow examples in <code></code> tag
     </if>
     <if>
     c) Mathematical Formulas:
        - Use MathJax for rendering
        - Preserve LaTeX syntax
        - Follow examples in <Mathematical formulas></Mathematical formulas> tag
     </if>
     <if>
     d) Images:
        - Keep original <img> tags exactly as they are
        - Do not convert to base64
        - Follow display instructions in <image></image> tag
     </if>

  4. Process remaining content:
     - Convert regular text with proper HTML tags
     - Maintain original markdown formatting
     - Preserve content order exactly as in source
     - Place all content inside <section class="content p-6">

  5. Quality checks:
     ${dataVerify.dataVerify}
}
</for>

FINALIZATION:
1. Verify all content is processed
2. Ensure navigation is complete and properly linked
3. Validate all special content is rendered correctly
4. Return complete HTML document with:
   - All required scripts in <head>
   - Complete navigation structure
   - All content in proper order
   - NO text outside HTML tags
5. The search bar should only search and highlight within the content of markdown array, without filtering out or hiding the unsearched content.`;
