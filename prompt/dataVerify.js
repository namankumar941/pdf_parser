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

3. Functionality:
   - Charts are interactive
   - Code highlighting works
   - Math formulas render

- Check that ALL tables contain ALL their original data and suitable chart or charts are created per table.
- check in table no column or rows are left behind.
- Verify that ALL lists include ALL their original items
- Confirm that ALL numerical values and statistics are preserved exactly
- verify that no text content is omitted from markdown string.
- main content of markdown is displayed as per the requirements
`;
