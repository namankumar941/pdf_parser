const example = `formula with some explanation in markdown is:
### Energy Formula
Einstein's famous equation that expresses the relationship between energy (E), mass (m), and the speed of light (c). It states that the energy of a body is equal to its mass multiplied by the square of the speed of light.
\[E = mc^2\]
then it is to be added in html framework page at its respective position as:
<head>
  <script type="text/javascript">
    window.MathJax = {
      tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEscapes: true
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    };
  </script>
  <script
    type="text/javascript"
    async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
  ></script>
  <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
    rel="stylesheet"
  />
</head>
<body
  class="font-sans bg-gray-100 p-8 flex justify-center items-center h-screen"
>
  <div
    class="bg-white border-2 border-gray-300 rounded-lg p-6 my-6 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:border-blue-500 w-full max-w-4xl"
  >
    <div class="text-xl font-bold text-gray-800 mb-4">
      Energy Formula (E = mc²)
    </div>
    <div class="text-lg text-gray-600 mb-4">
      The formula \( E = mc^2 \) is Einstein's famous equation that expresses
      the relationship between energy (E), mass (m), and the speed of light (c).
      It states that the energy of a body is equal to its mass multiplied by the
      square of the speed of light.
    </div>
    <div
      class="text-3xl font-serif text-gray-800 border-2 border-blue-500 bg-yellow-100 p-6 rounded-lg text-center mt-8"
    >
      \( E = mc^2 \)
    </div>
  </div>
</body>`;

exports.mathematicalFormulas = `
- Mathematical formulas: If formulas are present, convert and render them carefully in the HTML page using MathJax or similar.
- add Mathematical formulas using following "\(\)" notation in html page as used in example.
- Keep the HTML code concise and clean, using minimal but effective Tailwind classes.
- inside the <example></example> tag, provide the example for rendering Mathematical formulas in html file.
- add script inside head carefully so that formula is rendered perfectly.
- Add the <head>, <script>, and main content sections in their appropriate places within the HTML framework.

<example>
${example}
</example>
`;
