exports.navigationBar = `Step 3: Create Navigation Structure(Left Side)
- Extract ALL headings and subheadings from ALL Markdown pages
- Create a complete navigation map with all main headings and their subheadings
- Verify that no sections are missing from the navigation
- Sticky and vertically aligned.
- List of dynamic sections generated from all headings present in the markdowns content.
- On clicking on heading, a dropdown is shown that contains all subheadings under that heading.
- On click on subheading, smoothly scrolls to the associated content in the right panel.
- if any heading doesn't have subheading then no dropdown is revealed and directly scrolls to the associated content in the right panel.

Step 4: Navigation Implementation
Display ALL headings/subheadings vertically in the navigation bar
Implement dropdown functionality for headings with subheadings
Add scroll-to-section functionality for all navigation items
Include hover effects and active states for better UX

<example> example for step 3 and step 4:
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
    <div class="navigationbar">
      <h1>Super Heading of PDF</h1>
      <div class="nav">
        <div class="nav-item" data-target="xyz">
          <span>Heading 1</span>
          <span class="arrow">▸</span>
        </div>
        <div class="dropdown-content" id="xyz-dropdown">
          <a href="#xyz-description" class="dropdown-item">Sub-heading 1</a>
          <a href="#xyz-description" class="dropdown-item">Sub-heading 2</a>
        </div>

        <div class="nav-item" data-target="abc">
          <span>Heading 2</span>
          <span class="arrow">▸</span>
        </div>
        <div class="dropdown-content" id="abc-dropdown">
          <a href="#abc-description" class="dropdown-item">Sub-heading 1</a>
        </div>
      </div>
    </div>

    <script>
      // Navigation dropdown functionality
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", function () {
          const target = this.getAttribute("data-target");
          const dropdown = document.getElementById("$ {target}-dropdown");
          const arrow = this.querySelector(".arrow");

          // Toggle the active state for this dropdown
          dropdown.classList.toggle("show");
          arrow.classList.toggle("active");

          // Close other dropdowns
          document.querySelectorAll(".dropdown-content").forEach((content) => {
            if (
              content.id !== " $ {target}-dropdown" &&
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
</example>`;
