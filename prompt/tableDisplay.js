const example1 = `
    if table in markdown string is: 
    | Metric    | Value  | Change |
    |-----------|--------|--------|
    | Customers | 45,320 | +5.4%  |
    | Orders    | 45,320 | +12.6% |
    | Earnings  | $8,750 | -2.4%  |
    | Growth    | +3.52% | +22%   |
    
    then it is to be added in html framework page at its respective position as:
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6 min-h-screen">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div class="bg-white p-5 rounded-xl shadow">
      <h3 class="text-gray-500 text-lg mb-1">Customers</h3>
      <div class="text-2xl font-bold">45,320</div>
      <div class="text-green-600 font-medium">+5.4%</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow">
      <h3 class="text-gray-500 text-lg mb-1">Orders</h3>
      <div class="text-2xl font-bold">45,320</div>
      <div class="text-green-600 font-medium">+12.6%</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow">
      <h3 class="text-gray-500 text-lg mb-1">Earnings</h3>
      <div class="text-2xl font-bold">$8,750</div>
      <div class="text-red-600 font-medium">−2.4%</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow">
      <h3 class="text-gray-500 text-lg mb-1">Growth</h3>
      <div class="text-2xl font-bold">+3.52%</div>
      <div class="text-green-600 font-medium">+22%</div>
    </div>
  </div>
</body>
`;

const example2 = `
    if table in markdown string is:
    | Channel   | Amount |
    |-----------|--------|
    | Direct    | 300    |
    | Affiliate | 150    |
    | Ads       | 50     |


    then it is to be added in html framework page at its respective position as:

<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex justify-center items-center min-h-screen bg-white">
  <div class="flex gap-12">
    <table class="w-72 border border-gray-300 text-center">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-3 py-2">Channel</th>
          <th class="border px-3 py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-3 py-2">Direct</td>
          <td class="border px-3 py-2">300</td>
        </tr>
        <tr>
          <td class="border px-3 py-2">Affiliate</td>
          <td class="border px-3 py-2">150</td>
        </tr>
        <tr>
          <td class="border px-3 py-2">Ads</td>
          <td class="border px-3 py-2">50</td>
        </tr>
      </tbody>
    </table>
    <canvas id="channelChart" width="300" height="300"></canvas>
  </div>

  <script>
    new Chart(document.getElementById("channelChart"), {
      type: "doughnut",
      data: {
        labels: ["Direct", "Affiliate", "Ads"],
        datasets: [
          {
            label: "Amount",
            data: [300, 150, 50],
            backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Channel Amount Distribution" },
        },
      },
    });
  </script>
</body>
`;

exports.tableDisplay = `TABLE AND CHART RENDERING INSTRUCTIONS:

1. Table Styling:
   - Use Tailwind CSS classes for clean, responsive tables
   - Add borders, proper padding, and hover effects
   - Ensure mobile responsiveness
   - Place inside <section class="content p-6">

2. Chart Generation:
   - Analyze table data to determine best chart type
   - Options: given inside <charts></charts> tag
   - Use Chart.js for interactive visualizations
   - Multiple charts if needed for complex data
   - Place charts beside or below tables

3. Layout Structure:
   <div class="flex flex-col md:flex-row gap-6 my-6">
     <div class="w-full md:w-1/2">
       [Table goes here]
     </div>
     <div class="w-full md:w-1/2">
       [Chart goes here]
     </div>
   </div>

4. Required Scripts:
   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


<charts>
list of chart options : [ stacked bar chart, line and bar chart, histogram, Pie Chart, Bar Chart, Line Chart, Area Chart, Doughnut Chart, Heatmap, Scatter Plot, Tree Map, Gantt Chart, sunburst, radar chart]
</charts>

EXAMPLES:

1. Metric Dashboard:
<example1>
${example1}
</example1>

2. Data Distribution:
<example2>
${example2}
</example2>

CHART SELECTION GUIDE:
- Comparison data → Bar/Column charts
- Time series → Line charts
- Parts of whole → Pie/Doughnut charts
- Distributions → Histogram/Area charts
- Correlations → Scatter plots
- Multi-variable → Radar charts
- Geographic → Heat maps
`;
