exports.codeRepresentation = `<step order="3b">
      For each fenced code block:
        - write html code that renders an interactive code block
        - Scrollable Code Block: If the code exceeds the width of the container, allow horizontal scrolling so that the user can see the entire code without breaking the layout.
        - The code should be displayed inside a block with a black background and light-colored text to ensure visibility. Use a monospace font for the code and make the code block easily distinguishable from normal text.
        - The bodyScript key should include any scripts that are intended to be added inside the <body> tag, such as event handlers or deferred scripts.
        - "head" key in final response only have the essential scripts and links to be included within the <head> tag of the final HTML code. Avoid including any scripts or resources that should be placed inside the <body> tag.
        - understand the example carefull given under <example> tag
      CRITICAL REQUIREMENT (MUST FOLLOW):
      - Normal text above or below the code block should be added in the final html code at their respective position. Do not ommit, alter or rearrange any text present in the original markdown string.
      - Before sending final response make sure all data of markdown string is present in the final html code and data of markdown string is not altered.
      - The HTML or JavaScript code string added to the final response should be on a single line and must not contain any newline characters or span multiple lines.
      - do not alter ant text inside markdown string while placing it inside response json
    </step>`;
