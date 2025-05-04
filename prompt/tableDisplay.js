const example1 = `
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
  <title>Dashboard</title>
</head>
<body class="bg-gray-100 p-6 min-h-screen">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
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

  <div class="bg-white p-6 rounded-xl shadow">
    <div id="metricChart" style="width: 100%; height: 400px"></div>
  </div>

  <script>
    const chart = echarts.init(document.getElementById("metricChart"));

    const option = {
      title: {
        text: "Metric Overview",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Value", "Change %"],
        bottom: 0,
      },
      xAxis: {
        type: "category",
        data: ["Customers", "Orders", "Earnings", "Growth"],
      },
      yAxis: [
        {
          type: "value",
          name: "Value",
        },
        {
          type: "value",
          name: "Change %",
          axisLabel: {
            formatter: "{value} %",
          },
        },
      ],
      series: [
        {
          name: "Value",
          type: "bar",
          data: [45320, 45320, 8750, 3.52],
          itemStyle: {
            color: "#60A5FA",
          },
        },
        {
          name: "Change %",
          type: "line",
          yAxisIndex: 1,
          data: [5.4, 12.6, -2.4, 22],
          itemStyle: {
            color: "#10B981",
          },
          lineStyle: {
            width: 3,
          },
          symbolSize: 10,
        },
      ],
    };

    chart.setOption(option);
    window.addEventListener("resize", () => chart.resize());
  </script>
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
  <script src="https://code.highcharts.com/highcharts.js"></script>
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
    <div id="channelChart" style="width: 300px; height: 300px"></div>
  </div>

  <script>
    Highcharts.chart("channelChart", {
      chart: { type: "pie" },
      title: { text: "Channel Amount Distribution" },
      series: [
        {
          name: "Amount",
          data: [
            { name: "Direct", y: 300 },
            { name: "Affiliate", y: 150 },
            { name: "Ads", y: 50 },
          ],
        },
      ],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: { enabled: true, format: "{point.name}: {point.y}" },
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
   - Use Highcharts, ECharts, or D3.js to visualize the data in this table.
   - use Multiple charts if needed for complex data
   - Place charts beside or below tables


EXAMPLES:

1. Metric Dashboard:
<example1>
${example1}
</example1>

2. Data Distribution:
<example2>
${example2}
</example2>

- Add the <head>, <script>, and main content sections in their appropriate places within the HTML framework.
`;
