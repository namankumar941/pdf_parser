const content1 = `<table class='w-72 border border-gray-300 text-center'><thead class='bg-gray-100'><tr><th class='border px-3 py-2'>Channel</th><th class='border px-3 py-2'>Amount</th></tr></thead><tbody><tr><td class='border px-3 py-2'>Direct</td><td class='border px-3 py-2'>300</td></tr><tr><td class='border px-3 py-2'>Affiliate</td><td class='border px-3 py-2'>150</td></tr><tr><td class='border px-3 py-2'>Ads</td><td class='border px-3 py-2'>50</td></tr></tbody></table>`;
const content2 = `<div id='channelChart' style='width: 300px; height: 300px'></div>`;
const script = `Highcharts.chart('channelChart', {chart: { type: 'pie' },title: { text: 'Channel Amount Distribution' },series: [{name: 'Amount',data: [{ name: 'Direct', y: 300 },{ name: 'Affiliate', y: 150 },{ name: 'Ads', y: 50 }]}],plotOptions: {pie: {allowPointSelect: true, cursor: 'pointer',dataLabels: { enabled: true, format: '{point.name}: {point.y}' }}}});`;
const example = `
table in input Markdown:
    | Channel   | Amount |
    |-----------|--------|
    | Direct    | 300    |
    | Affiliate | 150    |
    | Ads       | 50     |

Add following in final Output JSON:
  1. add following script in "head" key of Output JSON:
    "<script src='https://code.highcharts.com/highcharts.js'></script>"
  
  2. add following object in "body" key of Output JSON: 
    {
      heading: "Channel Breakdown",
      content: [
        {
          subheading: "Traffic Table + Chart",
          content: [
            {
              "sub-subheading": "Channel Table",
              content: ["${content1}"]
            },
            {
              "sub-subheading": "Pie Chart",
              content: ["${content2}"]
            }
          ]
        }
      ]
    }

  3. [CRITICAL] add following chart rendering script in "bodyScript" key of Output JSON:
  "bodyScript": ['${script}']
  IMPORTANT: Failure to add the chart rendering script to "bodyScript" will result in charts not being displayed.
`;

exports.tableDisplay = `
<step order="3a" importance="CRITICAL">
- perform every step inside <for> loop tag gor all tables in markdown string
<For perform following steps for all tables>
  1. Table Styling:
  - Use Tailwind CSS classes for clean, responsive tables
  - Add borders, proper padding, and hover effects
  - Ensure mobile responsiveness
  - Place inside <section class="content p-6">

  2. Chart Generation:
  - Analyze table data to determine best chart type
  - Use Highcharts, ECharts, or D3.js to visualize the data in this table.
  - use Multiple charts if needed for complex data
  - Place charts beside or below tables

  3. add required script used for better representation

  4. CRITICAL REQUIREMENT (MUST FOLLOW):
  - The table in the final JSON response should be properly structured in a row and column format. It should not merge all columns and rows into a single column or row.
  - structure of table in final response should be maintained same structure as in markdown string.
  - You MUST add all chart rendering scripts to the "bodyScript" key in the final Output JSON (eg. if Highcharts is used then script added to "bodyScript" key: <script>Highcharts.chart('channelChart', { /* chart config */ });</script>)
  - Without the chart rendering script in the "bodyScript" key, charts WILL NOT render
  - You MUST include the chart rendering script as shown in the example below
  - Library imports go in "head" (Highcharts)
  - Chart containers go in "body" (divs with ids)
  - Chart rendering code MUST go in "bodyScript"
  - understand the example and see which part of html code is added where in final json object.
  - The HTML or JavaScript code string added to the final response should be on a single line and must not contain any newline characters or span multiple lines.
  - do not alter ant text inside markdown string while placing it inside response json
  - ensure all table are present in final json response
  <example>
  ${example}
  </example>
  </For>
</step>
    `;
