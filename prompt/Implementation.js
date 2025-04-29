const dataVerify = require("./dataVerify");
exports.Implementation = `step 1. Return ONLY valid HTML code with NO explanations or text outside HTML tags
step 2. Use EXACTLY the same HTML structure, class names, and element hierarchy as shown in the example inside <ui example> </ui example> tag
step 3. Copy ALL CSS and JavaScript EXACTLY as provided - do not modify or omit any styles or functionality
step 4. Keep ALL original img tags intact - do not modify or convert them
step 5. Generating the basic HTML page as per example inside <ui example> </ui example> tag 
step 6. important functionality that is to be added in basic HTML page are given inside <functionality></functionality> tag, HTML code for these 
functionality are given inside <ui example> </ui example> tag 
step 7. now steps 8 to 20 are done in iteration till there are string present in markdown array.(eg initially i=0) run for loop as per the instruction inside<for></for> tag

<for>
for(i=0; i<markdownArray.length ; i++) 
{
//step 8 to 20 are wraped inside this loop break this loop only if steps inside this loop are executed for all string of markdownArray
step 8. take one string from markdown array at a time (eg take markdownArray[i])
step 9. read the data inside the markdown string carefully so that no content or data is left behind and structure of data is also maintained.
step 10. extract the heading and subheading from markdown string and add then in navigation bar as per the navigation instruction present inside <navigation instruction></navigation instruction> tag.
step 11. below are three if loop inside <if></if> tag, execute them one by one
<if> 
step 12. if (markdownArray[i] has table) 
            then render the table and its suitable chart in HTML code as per the instruction inside <table></table> tag.
</if> 
<if> 
step 13. if (markdownArray[i] has code) 
            then render the code in HTML code as per the instruction inside <code ></code > tag.
</if> 
<if> 
step 14. if (markdownArray[i] has Mathematical formulas) 
            then render the Mathematical formulas in HTML code as per the instruction inside <Mathematical formulas></Mathematical formulas> tag.
</if> 
step 15. Render rest content also in same order as it is present and markdown string.
step 16. most important make sure nothing inside the markdown string is left behind.
step 17. Keep ALL original img tags intact - do not modify or convert them
step 18. Place converted markdown content inside .content div
step 19. before moving to next step verify:
${dataVerify.dataVerify}
step 20. break this loop if and only if i == markdownArray.length
}
</for>

step 21. wait till above for loop is executed completely for all i < markdownArray.length
step 22. merge all outputs from above steps into one html file.
step 23. return a full html file as a response with NO explanations or text outside HTML tags`;
