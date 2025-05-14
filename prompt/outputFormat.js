const example = `{
  head: ['<script></script>','<script></script>','<link>'],
  body: [
    {
      heading: "heading 1",
      content: [
        {
          subheading: "subheading 1",
          content: [
            {
              "sub-subheading": "sub-subheading 1",
              content: ["<div></div>","<div></div>"],
            },
          ],
        },
        {
          subheading: "subheading 2",
          content: ["<div></div>","<div></div>"],
        },
      ],
    },
    {
      heading: "heading 2",
      content: [<div></div>,"<div></div>"],
    },
  ],
  bodyScript : ['<script></script>','<script></script>']
}`;

exports.outputFormat = `
<returnFormat type="json">
  <key name="head">
    <!-- An array of <script> and <link> tags as strings to be included in the document’s <head> -->
  </key>
  <key name="body">
    <!-- An array of sections, each with "heading" and "content":
        - If "content" is an array of string, it should be an single line HTML block string(e.g., "<div></div>").
        - If "content" is an array of objects, it contains objects with "subheading" and "content":
          - Each "content" under a subheading may be an array of string (HTML) or an array of objects with:
            - "sub-subheading": string
            - "content": an array of single line HTML string
    -->
  </key>
  <key name="bodyScript">
    <!-- An array of <script> to be included inside html body -->
  </key>
  <example>
  ${example}
  </example>

  <note>
  - Please build the response without adding the following Tailwind script in the "head" key of the final response:
  <script src='https://cdn.tailwindcss.com'></script>
  - no text outside { } of final output
  - The head key should include only the essential scripts and resources to be added inside the <head> tag. This should include meta tags, CSS files, and any critical JavaScript that must be loaded in the <head> section.
  - The bodyScript key should include any scripts that are intended to be added inside the <body> tag, such as event handlers or deferred scripts.
  - Make sure to avoid including any body-specific scripts within the <head> section
  </note>
  CRITICAL REQUIREMENT (MUST FOLLOW):
  - analyse the example and understand the structure of final json object.
  - The HTML or JavaScript code string added to the final response should be on a single line and must not contain any newline characters or span multiple lines.
  - do not alter ant text inside markdown string while placing it inside response json   
</returnFormat>`;
