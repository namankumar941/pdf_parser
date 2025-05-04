const example = `
code with some explanation in markdown is:
The following is an example of a JavaScript function that calculates the square of a number. The code block is displayed with a **black background** and **light text** for clarity.

function square(num) { 
    return num * num; 
}

console.log(square(5)); // Output: 25

then it is to be added in html framework page at its respective position as:

<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans bg-gray-100 p-8">
  <div
    class="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-lg hover:bg-blue-50 hover:border-blue-500 transition-all"
  >
    <div class="text-2xl font-bold text-gray-800 mb-4">Example Code Block</div>

    <div class="text-lg text-gray-600 mb-4">
      The following is an example of a JavaScript function that calculates the
      square of a number. The code block is displayed with a
      <strong>black background</strong> and <strong>light text</strong> for
      clarity.
    </div>
    <div
      class="bg-black text-gray-100 font-mono p-6 rounded-md text-lg overflow-x-auto whitespace-pre-wrap border-2 border-blue-500 hover:bg-gray-900 hover:border-blue-400"
    >
      function square(num) { <br />
      &nbsp;&nbsp;&nbsp; return num * num; <br />
      } <br />
      <br />
      console.log(square(5)); // Output: 25
    </div>
  </div>
</body>
`;

exports.codeRepresentation = `
- Create an HTML page that renders an interactive code block
- Scrollable Code Block: If the code exceeds the width of the container, allow horizontal scrolling so that the user can see the entire code without breaking the layout.
- The code should be displayed inside a block with a black background and light-colored text to ensure visibility. Use a monospace font for the code and make the code block easily distinguishable from normal text.
- inside the <example></example> tag, provide the example for rendering code block in html file.
- Add the <head>, <script>, and main content sections in their appropriate places within the HTML framework.
<example>
${example}
</example>`;
