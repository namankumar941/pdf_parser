exports.tableDisplay = `Given markdown data that may contain a table in that case, Render the table into HTML code with clean styling (bordered, padding, and responsive).
    * Analyze the table content: create a suitable chart (eg from the following options: Pie Chart, Bar Chart, Column Chart, Line Chart, Area Chart, Doughnut Chart, Heatmap, Scatter Plot, Tree Map, Gantt Chart, Pivot Table, cards).
    * Generate the HTML code for the recommended chart too, using any simple JavaScript charting library like Chart.js (if needed).
    * Include both: The rendered HTML Table and The chart embedded below or beside the table.
    * <example1>
    if table in markdown string is: 
    | Metric    | Value  | Change |
    |-----------|--------|--------|
    | Customers | 45,320 | +5.4%  |
    | Orders    | 45,320 | +12.6% |
    | Earnings  | $8,750 | -2.4%  |
    | Growth    | +3.52% | +22%   |
    
    then it is diplayed in html page as:
    <style>
      .cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 30px;
      }

      .card {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .card h3 {
        font-size: 18px;
        color: #666;
        margin-bottom: 8px;
      }

      .card .value {
        font-size: 24px;
        font-weight: bold;
        color: #000;
      }

      .card .change.positive {
        color: #28a745;
      }

      .card .change.negative {
        color: #dc3545;
      }
    </style>
    <body>
            <div class="cards">
              <div class="card">
                <h3>Customers</h3>
                <div class="value">45,320</div>
                <div class="change positive">+5.4%</div>
              </div>
              <div class="card">
                <h3>Orders</h3>
                <div class="value">45,320</div>
                <div class="change positive">+12.6%</div>
              </div>
              <div class="card">
                <h3>Earnings</h3>
                <div class="value">$8,750</div>
                <div class="change negative">−2.4%</div>
              </div>
              <div class="card">
                <h3>Growth</h3>
                <div class="value">+3.52%</div>
                <div class="change positive">+22%</div>
              </div>
            </div>    
    </body>

    </example1>

    <example2>
    if table in markdown string is:
    | Channel   | Amount |
    |-----------|--------|
    | Direct    | 300    |
    | Affiliate | 150    |
    | Ads       | 50     |


    then it is diplayed in html page as

        <style>
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        margin-top: 50px;
      }
      table {
        border-collapse: collapse;
        width: 300px;
      }
      table,
      th,
      td {
        border: 1px solid #ccc;
      }
      th,
      td {
        padding: 10px;
        text-align: center;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>

  <body>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Direct</td>
            <td>300</td>
          </tr>
          <tr>
            <td>Affiliate</td>
            <td>150</td>
          </tr>
          <tr>
            <td>Ads</td>
            <td>50</td>
          </tr>
        </tbody>
      </table>
      <canvas id="channelChart" width="300" height="300"></canvas>
    </div>

    <script>
      const ctx = document.getElementById("channelChart").getContext("2d");
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Direct", "Affiliate", "Ads"],
          datasets: [
            {
              label: "Amount",
              data: [300, 150, 50],
              backgroundColor: [
                "#4CAF50", // green
                "#FFC107", // amber
                "#F44336", // red
              ],
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Channel Amount Distribution",
            },
          },
        },
      });
    </script>
  </body>
    </example2>
`;
