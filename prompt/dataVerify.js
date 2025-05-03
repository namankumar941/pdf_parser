exports.dataVerify = `QUALITY CHECKS:

1. Content Completeness:
   - All text from markdown is converted to HTML
   - No content is missing or truncated
   - Content order matches source markdown exactly

2. Special Elements:
   - Tables are properly formatted with charts
   - Code blocks have syntax highlighting
   - Mathematical formulas render correctly
   - Image tags are preserved exactly as in source

3. Navigation:
   - All headings are in navigation menu
   - Heading IDs match navigation links
   - Proper nesting of subheadings
   - If a heading has subheadings, clicking it shows a dropdown with its subheadings.
   - If no subheadings, clicking directly scrolls to the section.
   - Smooth scroll to content on click on subheading.

4. Structure:
   - All content is inside <section class="content p-6">
   - Required scripts are in <head>
   - Proper HTML structure and nesting

5. Functionality:
   - Charts are interactive
   - Code highlighting works
   - Math formulas render
   - Navigation links work
   - Search functionality works

- Check that ALL tables contain ALL their original data and suitable chart or charts are created per table.
- check in table no column or rows are left behind.
- Verify that ALL lists include ALL their original items
- Confirm that ALL numerical values and statistics are preserved exactly
- verify that no text content is omitted from markdown string.
- main content of markdownArray[i] is displayed as per the requirements`;
