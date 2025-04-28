exports.mathematicalFormulas = `
- Mathematical formulas: If formulas are present, convert and render them carefully in the HTML page using MathJax or similar.
- inside the <example></example> tag, provide the example for rendering Mathematical formulas in html file.
<example>
formula with some explanation in markdown is:
'### Energy Formula
Einstein's famous equation that expresses the relationship between energy (E), mass (m), and the speed of light (c). It states that the energy of a body is equal to its mass multiplied by the square of the speed of light.
\[
E = mc^2
\]'
then it is diplayed in html page as:
<head>
    <script
      type="text/javascript"
      async
      src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
    ></script>

    <!-- Styling for the interactive block -->
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f9;
      }
      .formula-container {
        background-color: #fff;
        border: 2px solid #ddd;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
      .formula-container:hover {
        background-color: #e9f7ff;
        border-color: #007bff;
      }
      .formula-header {
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
      .formula {
        font-size: 1.5em;
        font-family: "Times New Roman", Times, serif;
        color: #333;
        padding: 10px;
        border: 2px solid #007bff;
        background-color: #f1f8ff;
        text-align: center;
        border-radius: 5px;
      }
    </style>
    </head>
      <body>
    <div class="formula-container">
      <div class="formula-header">Energy Formula (E = mc²)</div>

      <div class="explanation">
        The formula \( E = mc^2 \) is Einstein's famous equation that expresses
        the relationship between energy (E), mass (m), and the speed of light
        (c). It states that the energy of a body is equal to its mass multiplied
        by the square of the speed of light.
      </div>

      <!-- Formula Display -->
      <div class="formula">\( E = mc^2 \)</div>
    </div>
  </body>
  </example>
`;
