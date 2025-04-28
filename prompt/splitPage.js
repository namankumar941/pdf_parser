exports.splitPage = `Step 1: Split Page Layout
- Left Side: Sticky vertical navigation bar showing all extracted headings
- Right Side: Scrollable main content area with all processed Markdown
Ensure both areas scale appropriately on different screen sizes
<example>“““
    <style>
      .body {
        display: flex;
        height: 100vh;
      }
      .navigationbar {
        width: 240px;
        padding: 30px 20px;
        overflow-y: auto;
      }
      .main {
        flex: 1;
        padding: 0;
        overflow-y: auto;
        height: 100vh;
      }
    </style>
  <body>
    <div class="navigationbar"></div>
    <div class="main"></div>
  </body>
“““</example>

Step 2: Design Enhancement
Apply consistent styling using Tailwind CSS
Use soft background colors, subtle transitions, and hover effects
Support both light and dark themes with appropriate color adjustments
<example>
“““
   <style>
      .body {
        display: flex;
        height: 100vh;
        background: #f4f7fa;
        color: #333;
        font-family: "Inter", sans-serif;
        height: 100%;
      }
      .navigationbar {
        width: 240px;
        background-color: #0d1b2a;
        color: #fff;
        padding: 30px 20px;
        overflow-y: auto;
        height: 100vh;
        position: sticky;
      }
      .main {
        flex: 1;
        padding: 0;
        overflow-y: auto;
        height: 100%;
      }
    </style>
“““
</example>`;

