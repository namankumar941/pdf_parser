exports.searchBar = `Step 5: Search Functionality
- Add a sticky search bar at the top-right of the main content area
- Implement text highlighting for search matches
- Add a match indicator for navigating between search results
- Only display the indicator when search is active
- do not change the content of the main content area while searching for matches.

<example>
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
    <script>
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
          ".content td, .content th, .content p, .content li, .content h2, .content h3, .content span"
        );
        textElements.forEach((el) => {
          const originalText = el.textContent;
          const lower = originalText.toLowerCase();
          if (searchTerm && lower.includes(searchTerm)) {
            const regex = new RegExp("($ {searchTerm})", "gi");
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
</example>`;
