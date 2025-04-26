require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const { map } = require("zod");

const finalOutputJsonSchema = {
  format: {
    type: "json_schema",
    name: "merged_html_output",
    schema: {
      type: "object",
      properties: {
        html: { type: "string" },
      },
      required: ["html"],
      additionalProperties: false,
    },
    strict: true,
  },
};

const finalPrompt = `Markdown to React Interactive UI using Shadcn UI and Tailwind CSS
🛠️ General Task Description
You are a web designer developing a React-based HTML interface.

Input: An array of Markdown strings, each representing one page of a PDF.

Output: A visually enhanced, component-driven HTML using Shadcn UI components and Tailwind CSS.

All Markdown strings must be processed — none should be skipped.

📜 General Instructions
Follow the approach and style shown in the example below.

Preserve the original Markdown structure and meaning.

Use MDX format for responses, allowing embedding of React components.

You must use:

Tailwind CSS with variable-based colors (like bg-primary, text-primary-foreground).

Shadcn UI components.

Lucide React icons (where needed).

Ensure responsive design.

Each part of the Markdown should be wrapped inside a separate React or Shadcn UI component.

🎨 Styling Rules
Prefer Shadcn UI components unless stated otherwise.

Use Tailwind CSS colors, avoid using standard blues/indigos unless requested.

White background by default. Use wrappers if different backgrounds are needed.

Handle dark mode by toggling the dark class manually.

Make sure the text remains legible in dark mode.

♿ Accessibility
Use semantic HTML tags (main, header, etc.).

Add appropriate ARIA roles and attributes.

Use the sr-only class for screen-reader-only text.

All images must have alt text unless decorative.

📋 Functional Requirements
1. Content Analysis & Structuring
Parse the Markdown to identify:

Headings (#, ##, etc.), Paragraphs, Lists, Tables, Blockquotes, Code Blocks, Images.

Render each structure as a separate component using Shadcn UI.

2. Componentization
Split each Markdown page into smaller components.

Wrap sections with Shadcn UI containers (e.g., Card, Panel, Sheet).

3. Markdown to JSX Conversion
Convert Markdown to React-compatible JSX.

Preserve semantic hierarchy and embed it into Shadcn components.

Images must be responsive and constrained within the page width.

4. Styling & Theming
Use consistent spacing, typography, and theming.

Add support for light and dark modes.

5. Visual Enhancements
Add:

Section dividers.

Subtle transitions.

Hover effects.

Background visuals.

Use modern design practices.

🧩 Steps to Follow
Follow this exact sequence strictly:

Step 1: Extract Headings and Subheadings
Read all Markdown pages carefully.

Create a navigation map:

Main headings → Subheadings (if any).

Step 2: Split Page Layout
Left Side: Sticky vertical navigation bar.

Right Side: Scrollable main content area.

Step 3: Apply Backgrounds and Graphics
Use soft pastel colors, gradients, SVGs, etc.

Support both light and dark themes.

Step 4: Build the Navigation Bar (Left Side)
Display headings/subheadings vertically.

Clicking on a heading:

If it has subheadings → Expand dropdown.

Otherwise → Direct scroll to section.

Clicking a subheading → Smooth scroll to section.

Use Shadcn NavigationMenu.

Add hover effects, active states, and elegant typography.

Step 5: Add Search Bar (Top-Right of Main Content)
A sticky search bar that:

Highlights matching text.

Displays a match indicator next to the search box.

Allows cycling through matches.

Only shows indicator when text is searched.

Step 6: Main Content Area (Right Side)
Below the search bar, display all processed Markdown.

Each detected content type should be:

Table → Shadcn Table component.

Image → Shadcn Card with responsive design.

Code Block → PrismJS/Highlight.js inside Shadcn Card (dark background).

Blockquote → Styled nicely inside a Shadcn Card.

Use:

Soft background colors like bg-sky-50, bg-rose-50.

Readable text colors like text-slate-700, text-neutral-800.

Box shadows, rounded corners, hover effects.

📦 Final Output Format
After following all steps, combine all results into a single JSON object:
{
  "html": "<full final HTML/JSX code here>"
}

## example 
below is the example and my step by step detailed approach to complete the task. Follow this approach to complete the task.
<example>
Markdown array is:[
  '# 📊 Sales Analysis Report - Page 1\n📈 Overview Statistics\nMetric\tValue\tChange\nCustomers\t45,320\t+5.4%\nOrders\t45,320\t+12.6%\nEarnings\t$8,750\t-2.4%\nGrowth\t+3.52%\t+22%\n* Customer Count: 45,320 (↑ 5.4%)\n* Orders: 45,320 (↑ 12.6%)\n* Earnings: $8,750 (↓ 2.4%)\n* Overall Growth: 3.52% (Performance ↑ 22%)',
  '# 💵 Revenue Data - Page 2\nDaily Revenue for the Week\nDay\tRevenue\nMonday\t$3,000\nTuesday\t$5,000\nWednesday\t$4,000\nThursday\t$7,000\nFriday\t$10,000\nSaturday\t$8,000\nSunday\t$12,000\n* Revenue showed steady increase throughout the week.\n* Sunday peaked at $12,000.',
  '# 🛍️ Sales Distribution - Page 3\nSales by Channel\nChannel\tAmount\nDirect\t300\nAffiliate\t150\nAds\t50',
  '# 🏆 Top Selling Products - Page 4\nProduct Name\tID\tPrice\tQuantity Sold\tAmount\nPocket Drone 2.0\t5701\t$230\t8\t$19,460\nSmart Thermostat\t5683\t$725\t12\t$3,750\nLightning Jacket\t4881\t$875\t3\t$2,400\nVR Headset\t4570\t$194\t4\t$1,730\nWireless Speaker\t4878\t$838\t2\t$8,630\n* Product revenue calculated as Price × Quantity Sold.\n* Top Performer: Pocket Drone 2.0 ($19,460).'
]


For referenced, below are the step by step approach to the task and result after each step:

Step 1: read the markdown array carefully. And extract heading and subheading carefully that is to be displayed in the navigation bar.
result:
“““Heading:[
1. Sales Analysis(subheading: [Overview Statistics, Summary]),
2. Revenue Data (subheading: [Revenue Chart,Daily Breakdown]),
3. Sales Distribution(subheading: [Channel Distribution],
4. Top Products(subheading: [Product Listing,Explanation]
]”””
step 2:generate a basic user interface by following the steps given below:
- Split Page Design:
- Divide the page into two main part(left and right):
- **Left Side**: A vertical **navigation bar** that remains sticky.
- **Right Side**: A scrollable **main content area** where detailed content is rendered.
result:
“““
<style>.body { display: flex; height: 100vh;} 

.sidebar { width: 240px; padding: 30px 20px; overflow-y: auto; }
.main { flex: 1; padding: 0; overflow-y: auto; height: 100vh; }
</style>
<body>
<div class="sidebar"></div>
<div class="sidebar"></div>
</body>“““
step 3: give Graphics and Background design to left and right side of page:
- Use **light, aesthetic background colors** (e.g., soft pastel tones or gradients).
- Include **decorative graphics or subtle shapes** (e.g., SVG backgrounds, gradients, or section visuals) to enhance the UI without overwhelming the content.
- Ensure both light and dark themes are supported.
result:
“““.body { display: flex; height: 100vh; background: #f4f7fa; color: #333; font-family: "Inter", sans-serif; } 

.sidebar { width: 240px; background-color: #0d1b2a; color: #fff; padding: 30px 20px; overflow-y: auto; }
.main { flex: 1; padding: 0; overflow-y: auto; height: 100vh; }“““
step 4: Navigation Bar(Left Side):
- here headings representing the content inside the markdown array is displayed
- Sticky and vertically aligned.
- List of dynamic sections generated from all headings present in the markdowns content.
- On clicking on heading, a dropdown is shown that contains all subheadings under that heading.
- On click on subheading, smoothly scrolls to the associated content in the right panel.
- if any heading doesn't have subheading then no dropdown is revealed and directly scrolls to the associated content in the right panel.
- Use **Shadcn NavigationMenu** or Menu Bar components.
- Hover effects and highlighted active state.
- give proper text color and design to headings and subheadings.
result:
“““
<style>
 .nav {
display: flex;
flex-direction: column;
}
.nav-item {
padding: 12px 0;
color: #aaa;
text-decoration: none;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
transition: color 0.3s;
}
.nav-item:hover,
.nav-item.active {
color: #fff;
}
.dropdown-content {
padding-left: 20px;
display: none;
flex-direction: column;
}
.dropdown-content.show {
display: flex;
}
.dropdown-item {
padding: 8px 0;
color: #888;
text-decoration: none;
font-size: 14px;
transition: color 0.3s;
}
.dropdown-item:hover,
.dropdown-item.active {
color: #ff385c;
}

</style>
<body>
<div class="sidebar">
<h1>Sales Analysis</h1>
<div class="nav">
<div class="nav-item" data-target="overview">
<span>📊 Sales Analysis</span>
<span class="arrow">▸</span>
</div>
<div class="dropdown-content" id="overview-dropdown">
<a href="#overview-stats" class="dropdown-item"
>Overview Statistics</a
>
<a href="#overview-description" class="dropdown-item">Summary</a>
</div>
<div class="nav-item" data-target="revenue">
<span>📈 Revenue Data</span>
<span class="arrow">▸</span>
</div>
<div class="dropdown-content" id="revenue-dropdown">
<a href="#revenue-chart" class="dropdown-item">Revenue Chart</a>
<a href="#revenue-details" class="dropdown-item">Daily Breakdown</a>
</div>
<div class="nav-item" data-target="sales">
<span>🛒 Sales Distribution</span>
<span class="arrow">▸</span>
</div>
<div class="dropdown-content" id="sales-dropdown">
<a href="#sales-distribution" class="dropdown-item"
>Channel Distribution</a
>
</div>
<div class="nav-item" data-target="products">
<span>📦 Top Products</span>
<span class="arrow">▸</span>
</div>
<div class="dropdown-content" id="products-dropdown">
<a href="#top-products" class="dropdown-item">Product Listing</a>
<a href="#products-explanation" class="dropdown-item">Explanation</a>
</div>
</div>
</div>
<script>
// Navigation dropdown functionality
document.querySelectorAll(".nav-item").forEach((item) => {
item.addEventListener("click", function () {
const target = this.getAttribute("data-target");
const dropdown = document.getElementById('$ {target}-dropdown');
const arrow = this.querySelector(".arrow");
// Toggle the active state for this dropdown
dropdown.classList.toggle("show");
arrow.classList.toggle("active");
// Close other dropdowns
document.querySelectorAll(".dropdown-content").forEach((content) => {
if (
content.id !== '$ {target}-dropdown' &&
content.classList.contains("show")
) {
content.classList.remove("show");
content.previousElementSibling
.querySelector(".arrow")
.classList.remove("active");
}
});
});
});
// Smooth scrolling for navigation links
document.querySelectorAll(".dropdown-item").forEach((link) => {
link.addEventListener("click", function (e) {
e.preventDefault();
const targetId = this.getAttribute("href").substring(1);
const targetElement = document.getElementById(targetId);
if (targetElement) {
// Set active state for the clicked item
document.querySelectorAll(".dropdown-item").forEach((item) => {
item.classList.remove("active");
});
this.classList.add("active");
// Smooth scroll to the target
targetElement.scrollIntoView({
behavior: "smooth",
block: "start",
});
}
});
}); 
</script>
</body>
“““
step 5: Search bar in Main Content Area(Right Side):
- add a search bar on the top-right side of the page that is used to search any text on the right side of the html page.
this search bar should search the text that i want to search in the file displayed
The search bar should highlight the text similar to my search.
Search bar should be stuck at the top of the page.
When I search for something in the search bar, an indicator should appear on the left side of the search bar, allowing me to jump directly to the matched text. If the text appears multiple times, clicking the indicator repeatedly should cycle through each match, and after the last one, it should return to the first match.
search indicator is shown only when i search something
result:
“““
<style>
.top-bar {
position: sticky;
top: 0;
width: 100%;
background: #f4f7fa;
padding: 30px;
display: flex;
justify-content: flex-end;
align-items: center;
z-index: 999;
border-bottom: 1px solid #ddd;
box-sizing: border-box;
}
.search {
display: flex;
align-items: center;
gap: 10px;
}
.search input {
padding: 8px 12px;
border: 1px solid #ccc;
border-radius: 8px;
font-size: 14px;
width: 200px;
} 
</style>
<body>
<div class="main">
<div class="top-bar">
<div class="search">
<button id="nextMatchBtn" style="display: none">⬇️</button>
<input type="text" id="searchInput" placeholder="Search" />
</div>
</div>
</div>
<script>const searchInput = document.getElementById("searchInput");
const nextMatchBtn = document.getElementById("nextMatchBtn");
let matches = [];
let currentIndex = 0;
searchInput.addEventListener("input", handleSearch);
nextMatchBtn.addEventListener("click", navigateToNextMatch);
function handleSearch() {
const searchTerm = searchInput.value.trim().toLowerCase();
matches = [];
currentIndex = 0;
if (searchTerm) {
nextMatchBtn.style.display = "inline-block";
} else {
nextMatchBtn.style.display = "none";
}
// Select all text-containing elements inside '.content'
const textElements = document.querySelectorAll(
".content td, .content th, .content p, .content li, .content h2, .content h3, .content span"
);
textElements.forEach((el) => {
const originalText = el.textContent;
const lower = originalText.toLowerCase();
if (searchTerm && lower.includes(searchTerm)) {
const regex = new RegExp('($ {searchTerm})', "gi");
el.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
} else {
el.innerHTML = originalText;
}
});
matches = document.querySelectorAll(".content mark");
if (matches.length > 0) {
scrollToMatch(matches[0]);
}
}
function navigateToNextMatch() {
if (matches.length === 0) return;
scrollToMatch(matches[currentIndex]);
currentIndex = (currentIndex + 1) % matches.length;
}
function scrollToMatch(el) {
el.scrollIntoView({ behavior: "smooth", block: "center" });
el.style.animation = "highlightJump 0.6s ease";
setTimeout(() => (el.style.animation = ""), 600);
}
</script>
</body>

“““
step 6: Main Content on the Right Side
- Below the search bar all data present in the markdown array is to be displayed.
- make sure all data present in markdown in inserted properly and none left behind.
- For each detected content type (e.g., table, image, code block, quote), render it using a **separate React component** with Shadcn UI styling.
- **Table** → Wrap with Shadcn Table component.
- **Image** → Use responsive <img> inside a Shadcn Card or AspectRatio component.
- **Code block** → Use PrismJS or Highlight.js inside Shadcn Card with monospaced font and color theme.with black background
- **Blockquote** → Use elegant blockquote styling inside a Card or styled container.
- do proper Styling & Colors to different component on right side:
- Use **soft light color backgrounds** for each component (bg-sky-50, bg-rose-50, bg-zinc-50, etc.).
- Choose **readable and aesthetic text colors** (text-slate-700, text-neutral-800, text-gray-600) with good contrast.
- Add **box shadows**, **rounded corners**, and **hover transitions** for an elegant and modern look.
- tables, graphs or any other data other than normal text should be considered as a react or shadcn component and have proper styling so that they are seen as more interactive.
result:
“““
<style> .content {
padding: 30px;
}
.section {
margin-bottom: 40px;
scroll-margin-top: 100px;
}
.section-title {
font-size: 24px;
margin-bottom: 20px;
color: #333;
border-bottom: 2px solid #180105;
padding-bottom: 10px;
}
.subsection {
margin-bottom: 30px;
scroll-margin-top: 100px;
}
.subsection-title {
font-size: 20px;
margin-bottom: 15px;
color: #444;
}
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
.grid {
display: grid;
grid-template-columns: 2fr 1fr;
gap: 20px;
}
.chart-container,
.sales-container {
background: #fff;
border-radius: 12px;
padding: 20px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
table {
width: 100%;
border-collapse: collapse;
font-size: 14px;
margin-top: 10px;
}
table th,
table td {
padding: 10px;
text-align: left;
border-bottom: 1px solid #eee;
}
table th {
color: #888;
}
mark {
background-color: yellow;
color: black;
padding: 0 2px;
}
</style>
<body>
 <div class="main">
<div class="content">
<!-- Overview Section -->
<div id="overview" class="section">
<h2 class="section-title">Sales Analysis</h2>
<div id="overview-stats" class="subsection">
<h3 class="subsection-title">Overview Statistics</h3>
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
</div>
<div id="overview-description" class="subsection">
<h3 class="subsection-title">Summary</h3>
<p class="description">
Customer count stands at 45,320, reflecting a 5.4% increase.
Orders have also grown by 12.6%, while earnings have slightly
decreased by 2.4%, totaling $8,750. Overall growth is at 3.52%,
with a 22% increase in performance.
</p>
</div>
</div>
<!-- Revenue Section -->
<div id="revenue" class="section">
<h2 class="section-title">Revenue Data</h2>
<div id="revenue-chart" class="subsection">
<h3 class="subsection-title">Revenue Chart</h3>
</div>
<div class="grid">
<div class="chart-container">
<h3>Revenue</h3>
<canvas id="lineChart"></canvas>
</div>
</div>
<div id="revenue-details" class="subsection">
<h3 class="subsection-title">Daily Breakdown</h3>
<p class="description">
The daily revenue for the week shows a steady increase, peaking on
Sunday with $12,000. The week started at $3,000 on Monday, with
notable growth towards the end, reaching a high of $10,000 on
Friday and remaining strong through the weekend.
</p>
<ul class="daily-revenue">
<li><span>Monday:</span> <span>$3,000</span></li>
<li><span>Tuesday:</span> <span>$5,000</span></li>
<li><span>Wednesday:</span> <span>$4,000</span></li>
<li><span>Thursday:</span> <span>$7,000</span></li>
<li><span>Friday:</span> <span>$10,000</span></li>
<li><span>Saturday:</span> <span>$8,000</span></li>
<li><span>Sunday:</span> <span>$12,000</span></li>
</ul>
</div>
</div>
<!-- Sales Distribution Section -->
<div id="sales" class="section">
<h2 class="section-title">Sales Distribution</h2>
<div id="sales-distribution" class="subsection">
<h3 class="subsection-title">Channel Distribution</h3>
<div class="grid">
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
<div class="grid">
<div class="sales-container">
<h3>Total Sales</h3>
<canvas id="donutChart"></canvas>
</div>
</div>
</div>
</div>
</div>
<!-- Products Section -->
<div id="products" class="section">
<h2 class="section-title">Top Selling Products</h2>
<div id="top-products" class="subsection">
<h3 class="subsection-title">Product Listing</h3>
<table id="productTable">
<thead>
<tr>
<th>Product Name</th>
<th>ID</th>
<th>Price</th>
<th>Quantity</th>
<th>Amount</th>
</tr>
</thead>
<tbody>
<tr>
<td>Pocket Drone 2.0</td>
<td>5701</td>
<td>$230</td>
<td>8</td>
<td>$19,460</td>
</tr>
<tr>
<td>Smart Thermostat</td>
<td>5683</td>
<td>$725</td>
<td>12</td>
<td>$3,750</td>
</tr>
<tr>
<td>Lightning Jacket</td>
<td>4881</td>
<td>$875</td>
<td>3</td>
<td>$2,400</td>
</tr>
<tr>
<td>VR Headset</td>
<td>4570</td>
<td>$194</td>
<td>4</td>
<td>$1,730</td>
</tr>
<tr>
<td>Wireless Speaker</td>
<td>4878</td>
<td>$838</td>
<td>2</td>
<td>$8,630</td>
</tr>
</tbody>
</table>
</div>
<div id="products-explanation" class="subsection">
<h3 class="subsection-title">Explanation</h3>
<p class="description">
This is a breakdown of the top-selling products based on their
sales data. Here's an explanation of each column:
</p>
<ul class="description">
<li>
<strong>Product Name:</strong> The name of the product being
sold (e.g., Pocket Drone 2.0, Smart Thermostat).
</li>
<li>
<strong>ID:</strong> A unique identification number assigned to
each product in the system (e.g., 5701 for Pocket Drone 2.0).
</li>
<li>
<strong>Price:</strong> The individual price of one unit of the
product (e.g., Pocket Drone 2.0 costs $230 per unit).
</li>
<li>
<strong>Quantity:</strong> The number of units of the product
sold (e.g., 8 units of Pocket Drone 2.0 were sold).
</li>
<li>
<strong>Amount:</strong> The total revenue generated from the
sale of that product, calculated as: <br />Amount = Price ×
Quantity <br />For example, for the Pocket Drone 2.0, the total
amount generated from sales is: <br />$230 (Price) × 8
(Quantity) = $19,460.
</li>
</ul>
<p class="description">
This table helps track which products are performing well in terms
of sales volume and revenue.
</p>
</div>
</div>
</div>
</div>
</div>
<script>      const ctx1 = document.getElementById("lineChart").getContext("2d");
new Chart(ctx1, {
type: "line",
data: {
labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
datasets: [
{
label: "Revenue",
data: [3000, 5000, 4000, 7000, 10000, 8000, 12000],
fill: false,
borderColor: "#e74c3c",
tension: 0.3,
},
],
},
options: { responsive: true, plugins: { legend: { display: false } } },
});
const ctx2 = document.getElementById("donutChart").getContext("2d");
new Chart(ctx2, {
type: "doughnut",
data: {
labels: ["Direct", "Affiliate", "Ads"],
datasets: [
{
label: "Sales",
data: [300, 150, 50],
backgroundColor: ["#2e86de", "#f39c12", "#9b59b6"],
},
],
},
options: {
responsive: true,
plugins: { legend: { position: "bottom" } },
},
}); 
</script>
</body>
“““

After performing each and every step and combining result of every steps a json object is returned as a response, that store full html code eg:
{
html :”<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PowerPixel Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style> “add all style added here” </style>
</head>
<body>
<div class="sidebar"> “add all sidebar code here” </div>
<div class="main">
<div class="top-bar"> “add all top-bar code here” </div>
<div class="content"> “add all main content here” </div>
<div>
<script>”add all scripts here”</script>
</body>
</html>
 “
}
</example>
`;
//----------------------------------------------class----------------------------------------------

class OpenAiClass {
  async openAiApi(markdowns) {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey: openaiApiKey });
    const response = await openai.responses.create({
      model: "gpt-4o-2024-08-06",
      input: [
        {
          role: "system",
          content: finalPrompt,
        },
        {
          role: "user",
          content: `Markdown array: ${markdowns} `,
        },
      ],
      text: finalOutputJsonSchema,
    });
    console.log("ui generated using openai api");
    const event = JSON.parse(response.output_text);
    console.log("event", event);
    return event;
  }
}

module.exports = OpenAiClass;
