const dataVerify = require("./dataVerify");

exports.Implementation = ` 
<instructions>
- complete all steps inside <steps> tag
<steps>
  1. Parse markdown string completely
  2. Process special content (in order of appearance):
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

  3. Process remaining content:
    - Convert regular text with proper HTML tags
    - Maintain original markdown formatting
    - Preserve content order exactly as in source

  5. Quality checks:
    ${dataVerify.dataVerify}
</steps>
</instructions>`;
