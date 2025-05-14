const content1 = `
                "<div class='text-xl font-bold text-gray-800 mb-4'>Energy Formula (E = mc²)</div>"
                "<div class='text-lg text-gray-600 mb-4'>Einstein's famous equation that expresses the relationship between energy (E), mass (m), and the speed of light (c).</div>"
              `;
const content2 = `
                "<div class='text-3xl font-serif text-gray-800 border-2 border-blue-500 bg-yellow-100 p-6 rounded-lg text-center mt-8'>\\( E = mc^2 \\)</div>"
              `;
const example = `
mathematical Formulas with some explanation in markdown is:
    ## Energy Formula  
    Einstein's famous equation that expresses the relationship between energy (E), mass (m), and the speed of light (c).  
    \[E = mc^2\]

Add following in final Output JSON:
  1. add following link and script in "head" key of Output JSON: 
    "<script type='text/javascript'>window.MathJax = { tex: { inlineMath: [['\\\\(', '\\\\)']], displayMath: [['\\\\[', '\\\\]']], processEscapes: true }, options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'] } };</script>",
    "<script type='text/javascript' async src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML'></script>",
    "<link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel='stylesheet' />"
  ],
  2. add following object in "body" key of Output JSON:
        {
          heading: "Einstein's Equation",
          content: [
            {
              subheading: "Explanation",
              content: [${content1}]
            },
            {
              subheading: "Formula",
              content: [${content2}]
            },
          ],
        }
`;
exports.mathematicalFormulas = `<step order="3c">
      For each LaTeX formula:
        • must Preserve LaTeX syntax (\\(...\\)).
        • Render with MathJax.
        • Keep markup concise with minimal Tailwind classes.
        • The bodyScript key should include any scripts that are intended to be added inside the <body> tag, such as event handlers or deferred scripts.
        • "head" key in final response only have the essential scripts and links to be included within the <head> tag of the final HTML code. Avoid including any scripts or resources that should be placed inside the <body> tag
        • represent formula and explanation as:
          ["<div class='text-xl font-bold text-gray-800 mb-4'>Energy Formula (E = mc²)</div>",
          "<div class='text-lg text-gray-600 mb-4'>Einstein's famous equation that expresses the relationship between energy (E), mass (m), and the speed of light (c).</div>",
          "<div class='text-3xl font-serif text-gray-800 border-2 border-blue-500 bg-yellow-100 p-6 rounded-lg text-center mt-8'>\\( E = mc^2 \\)</div>",]
      CRITICAL REQUIREMENT (MUST FOLLOW):
      - Library imports go in "head" (eg. MathJax)
      - data containers go in "body" (divs with ids)
      - if ant javascript code needed MUST go in "bodyScript"
      - Normal text above or below the formula should be added in the final html code at their respective position. Do not ommit or rearrange any text present in the original markdown string.
      - Before sending final response make sure all data of markdown string is present in the final html code and is unaltered.
      - The HTML or JavaScript code string added to the final response should be on a single line and must not contain any newline characters or span multiple lines.
      - do not alter ant text inside markdown string while placing it inside response json
      <example>
      ${example}
      </example>
      </step>`;
