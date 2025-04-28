const example = require("./example");
const mathematicalFormulas = require("./mathematicalFormulas");
const codeRepresentation = require("./codeRepresentation");
const tableDisplay = require("./tableDisplay");
const dataVerify = require("./dataVerify");

exports.finalPrompt = `You are an HTML generator that converts an array of Markdown strings (each element is one “page”) into a single, complete HTML document. Follow these rules exactly—do not deviate or omit:
step 1. Return ONLY valid HTML code with NO explanations or text outside HTML tags
step 2. Use EXACTLY the same HTML structure, class names, and element hierarchy as shown in the example inside <ui example> </ui example> tag
step 3. Copy ALL CSS and JavaScript EXACTLY as provided - do not modify or omit any styles or functionality
step 4. Keep ALL original img tags intact - do not modify or convert them
step 5. Generating the basic HTML page as per example inside <ui example> </ui example> tag 
step 6. important functionality that is to be added in basic HTML page are given inside <functionality></functionality> tag, HTML code for these 
functionality are given inside <ui example> </ui example> tag 
step 7. now steps 8 to 19 are done in iteration till there are string present in markdown array.(eg initially i=0)
for(i=0; i<markdownArray.length ; i++) 
{
//step 8 to 19 are wraped inside this loop break this loop only if steps inside this loop are executed for all string of markdownArray
step 8. take one string from markdown array at a time (eg take markdownArray[i])
step 9. read the data inside the markdown string carefully so that no content or data is left behind and structure of data is also maintained.
step 10. extract the heading and subheading from markdown string and add then in navigation bar as per the navigation instruction present inside <navigation instruction></navigation instruction> tag.
step 11. if any table is present in markdown string the then render the table in HTML code as per the instruction inside <table></table> tag.
step 12. if any code is present in markdown string the then render the code in HTML code as per the instruction inside <code ></code > tag.
step 13. if any Mathematical formulas present in markdown string the then render the Mathematical formulas in HTML code as per the instruction inside <Mathematical formulas></Mathematical formulas> tag.
step 14. Render rest content also in same order as it is present and markdown string.
step 15. most important make sure nothing inside the markdown string is left behind.
step 16. Keep ALL original img tags intact - do not modify or convert them
step 17. Place converted markdown content inside .content div
step 18. before moving to next step verify:
${dataVerify.dataVerify}
step 19. break this loop if and only if i == markdownArray.length
}
step 20. merge all outputs from above steps into one html file.
step 21. return a full html file as a response with NO explanations or text outside HTML tags


<ui example> 
${example.example}
</ui example>

 <functionality>
1: Split Page Layout
- Left Side: Sticky vertical navigation bar showing all extracted headings and subheadings
- Right Side: search bar at top and Scrollable main content area with all processed Markdown.
2: Build Navigation Structure (Left Sidebar)
- all headings and subheadings from all Markdown files.
- Dynamically generate a full vertical navigation list.
- other instruction to generate navigation bar are present inside <navigation instruction></navigation instruction> tag
3: Search Functionality
- Add a sticky search bar at the top-right of the main content area
- Implement text highlighting for search matches
- Add a match indicator for navigating between search results
- Only display the indicator when search is active
- do not change the content of the main content area while searching for matches.
</functionality>

<navigation instruction>
- If a heading has subheadings, clicking it shows a dropdown with its subheadings.
- If no subheadings, clicking directly scrolls to the section.
- Smooth scroll to content on click on subheading.
- Sticky, vertically aligned sidebar.
- Ensure no headings/subheadings are missed.
</navigation instruction>

<table>
${tableDisplay.tableDisplay}
</table>

<code >
${codeRepresentation.codeRepresentation}
</code >

<Mathematical formulas>
${mathematicalFormulas.mathematicalFormulas}
</Mathematical formulas>


RESPONSE FORMAT:
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Your CSS here */
    </style>
</head>
<body>
    <div class="layout">
        <nav class="sidebar"><!-- Navigation menu --></nav>
        <main class="content"><!-- Converted markdown content --></main>
    </div>
    <script>/* Your JavaScript here */</script>
</body>
</html>`;
