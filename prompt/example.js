exports.example = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PowerPixel Dashboard</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />

    <style>
      body {
        display: flex;
        height: 100vh;
        margin: 0;
        font-family: "Inter", sans-serif;
      }
      .navigationbar {
        width: 240px;
        background-color: #0d1b2a;
        color: #fff;
        padding: 30px 20px;
        overflow-y: auto;
      }
      .main {
        flex: 1;
        padding: 0;
        overflow-y: auto;
        height: 100vh;
        background: #f4f7fa;
      }
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
      .content {
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
      mark {
        background-color: yellow;
        color: black;
        padding: 0 2px;
      }
      /* Arrow rotation style when active */
      .nav-item .arrow.active {
        transform: rotate(90deg);
      }
    </style>
  </head>
  <body>
    <div class="navigationbar">
      <h1>Super Heading of PDF</h1>
      <div class="nav">
        <div class="nav-item" data-target="xyz">
          <span>Heading 1</span>
          <span class="arrow">▸</span>
        </div>
        <div class="dropdown-content" id="xyz-dropdown">
          <a href="#xyz-sub1" class="dropdown-item">Sub-heading 1</a>
          <a href="#xyz-sub2" class="dropdown-item">Sub-heading 2</a>
        </div>

        <div class="nav-item" data-target="abc">
          <span>Heading 2</span>
          <span class="arrow">▸</span>
        </div>
        <div class="dropdown-content" id="abc-dropdown">
          <a href="#abc-sub1" class="dropdown-item">Sub-heading 1</a>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="top-bar">
        <div class="search">
          <button id="nextMatchBtn" style="display: none">⬇️</button>
          <input type="text" id="searchInput" placeholder="Search" />
        </div>
      </div>
      <div class="content">
        <!-- all content from markdown string display here for example -->
        <div id="xyz" class="section">
          <h2 class="section-title">Heading 1</h2>
          <div id="xyz-sub1" class="subsection">
            <h3>Sub-heading 1</h3>
            <p>
              This is the content for sub-heading 1 under heading 1. You can add
              your content here.
            </p>
          </div>
          <div id="xyz-sub2" class="subsection">
            <h3>Sub-heading 2</h3>
            <p>
              This is the content for sub-heading 2 under heading 1. You can add
              your content here.
            </p>
          </div>
        </div>

        <!-- ABC Section -->
        <div id="abc" class="section">
          <h2 class="section-title">Heading 2</h2>
          <div id="abc-sub1" class="subsection">
            <h3>Sub-heading 1</h3>
            <p>
              This is the content for sub-heading 1 under heading 2. You can add
              your content here.
            </p>
          </div>
        </div>
      </div>
    </div>
    <script>
      // Navigation dropdown functionality
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", function () {
          const target = this.getAttribute("data-target");
          const dropdown = document.getElementById('\${target}-dropdown');
          const arrow = this.querySelector(".arrow");

          // Toggle the active state for this dropdown
          dropdown.classList.toggle("show");
          arrow.classList.toggle("active");

          // Close other dropdowns
          document.querySelectorAll(".dropdown-content").forEach((content) => {
            if (
              content.id !== '\${target}-dropdown' &&
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

      const searchInput = document.getElementById("searchInput");
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
          ".content p, .content h2, .content h3"
        );

        textElements.forEach((el) => {
          const originalText = el.textContent;
          const lower = originalText.toLowerCase();

          if (searchTerm && lower.includes(searchTerm)) {
            const regex = new RegExp('(\${searchTerm})', "gi");
            el.innerHTML = originalText.replace(regex, "<mark>$1</mark>");
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
</html>`;
