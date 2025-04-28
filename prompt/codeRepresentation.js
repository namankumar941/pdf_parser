exports.codeRepresentation = `
- Create an HTML page that renders an interactive code block
- Scrollable Code Block: If the code exceeds the width of the container, allow horizontal scrolling so that the user can see the entire code without breaking the layout.
- The code should be displayed inside a block with a black background and light-colored text to ensure visibility. Use a monospace font for the code and make the code block easily distinguishable from normal text.
- inside the <example></example> tag, provide the example for rendering code block in html file.

<example>
code with some explanation in markdown is:
The following is an example of a JavaScript function that calculates the square of a number. The code block is displayed with a **black background** and **light text** for clarity.

function square(num) { 
    return num * num; 
}

console.log(square(5)); // Output: 25

then it is diplayed in html page as:
    <!-- Styling for the code block and interactive elements -->
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f9;
      }
      .content-container {
        background-color: #fff;
        border: 2px solid #ddd;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
      .content-container:hover {
        background-color: #e9f7ff;
        border-color: #007bff;
      }
      .header {
        font-size: 1.5em;
        margin-bottom: 10px;
        font-weight: bold;
        color: #333;
      }
      .explanation {
        font-size: 1.1em;
        color: #555;
        margin-bottom: 10px;
      }
      .code-block {
        background-color: #000;
        color: #f1f8ff;
        font-family: "Courier New", Courier, monospace;
        padding: 15px;
        border-radius: 5px;
        font-size: 1.1em;
        overflow-x: auto;
        white-space: pre-wrap; /* Ensures long lines are wrapped */
        margin-top: 10px;
        border: 2px solid #007bff;
      }
      .code-block:hover {
        background-color: #111;
        border-color: #0099ff;
      }
    </style>

  <body>
    <div class="content-container">
      <div class="header">Example Code Block</div>

      <div class="explanation">
        The following is an example of a JavaScript function that calculates the
        square of a number. The code block is displayed with a **black
        background** and **light text** for clarity.
      </div>

      <!-- Code Block Display -->
      <div class="code-block">
        function square(num) { <br />
        &nbsp;&nbsp;&nbsp; return num * num; <br />
        } <br />
        <br />
        console.log(square(5)); // Output: 25
      </div>
    </div>
  </body>
</example>`;
