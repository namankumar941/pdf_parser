exports.outputFormat =
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <!-- all script, link or anything required should be added here-->
    <style>
      body {
        font-family: "Inter", sans-serif;
      }
      mark {
        background-color: yellow;
        padding: 0 2px;
      }
    </style>
  </head>
  <body class="flex h-screen bg-[#f4f7fa] text-[#333]">
    <aside class="w-60 bg-[#0d1b2a] text-white p-6 overflow-y-auto">
      <h1 class="text-2xl text-[#ff385c] mb-10">Doc Heading</h1>
      <nav class="flex flex-col space-y-2">
        <div class="group" data-target="heading1">
          <div
            class="flex justify-between items-center cursor-pointer text-[#aaa] hover:text-white nav-item"
          >
            <span>heading 1</span>
            <span class="arrow">▸</span>
          </div>
          <div
            class="dropdown-content pl-5 hidden flex-col mt-2"
            id="heading1-dropdown"
          >
            <div>
              <a
                href="#heading1-subheading1"
                class="text-sm text-[#888] hover:text-[#ff385c] dropdown-item"
                >subheading 1</a
              >
            </div>
            <div>
              <a
                href="#heading1-subheading2"
                class="text-sm text-[#888] hover:text-[#ff385c] dropdown-item"
                >subheading 2</a
              >
            </div>
          </div>
        </div>
        <div class="group" data-target="heading2">
          <div
            class="flex justify-between items-center cursor-pointer text-[#aaa] hover:text-white nav-item"
          >
            <span>heading 2</span>
            <span class="arrow">▸</span>
          </div>
          <div
            class="dropdown-content pl-5 hidden flex-col mt-2"
            id="heading2-dropdown"
          >
            <div>
              <a
                href="#heading2-subheading1"
                class="text-sm text-[#888] hover:text-[#ff385c] dropdown-item"
                >subheading 1</a
              >
            </div>
          </div>
        </div>
      </nav>
    </aside>

    <main class="flex-1 h-screen overflow-y-auto">
      <header
        class="sticky top-0 bg-[#f4f7fa] border-b border-gray-300 p-6 flex justify-end z-50"
      >
        <div class="flex items-center gap-2">
          <button
            id="nextMatchBtn"
            class="hidden px-3 py-1 rounded bg-blue-600 text-white text-sm"
          >
            ⬇️
          </button>
          <input
            id="searchInput"
            type="text"
            placeholder="Search"
            class="w-48 px-3 py-1.5 border rounded-lg text-sm"
          />
        </div>
      </header>
      <section class="content p-6">
      <!-- all html code for content inside markdown array should be added here -->
      </section>
    </main>

    <script>
       document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", function () {
          const target = this.parentElement.getAttribute("data-target");` +
  "const dropdown = document.getElementById(`${target}-dropdown`);" +
  `const arrow = this.querySelector(".arrow");

          // If dropdown exists and has content
          if (dropdown && dropdown.children.length > 0) {
            dropdown.classList.toggle("hidden");
            arrow.classList.toggle("rotate-90");

            // Close other dropdowns
            document.querySelectorAll(".dropdown-content").forEach((el) => {
              if (el !== dropdown) {
                el.classList.add("hidden");
                el.previousElementSibling
                  .querySelector(".arrow")
                  ?.classList.remove("rotate-90");
              }
            });
          } else {
            // If no dropdown or empty dropdown, scroll directly to content
            const targetElement = document.getElementById(target);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      });

      document.querySelectorAll(".dropdown-item").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          document
            .querySelectorAll(".dropdown-item")
            .forEach((item) => item.classList.remove("text-[#ff385c]"));
          this.classList.add("text-[#ff385c]");
          const id = this.getAttribute("href").substring(1);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      
       
      <!-- all js script should be added here-->

    </script>
    <script>
      const searchInput = document.getElementById("searchInput");
      const nextMatchBtn = document.getElementById("nextMatchBtn");
      let matches = [];
      let currentIndex = 0;
      let debounceTimeout;

      // Restrict to markdown-rendered container only
      const markdownContainer = document.getElementById("markdownContainer");

      function scrollToMatch(el) {
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.style.animation = "highlightJump 0.6s ease";
          setTimeout(() => (el.style.animation = ""), 600);
        }
      }

      function clearHighlights() {
        if (!markdownContainer) return;
        markdownContainer.querySelectorAll("mark").forEach((mark) => {
          mark.outerHTML = mark.innerHTML;
        });
      }

      function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        clearHighlights();
        matches = [];
        currentIndex = 0;

        if (!searchTerm) {
          nextMatchBtn.style.display = "none";
          return;
        }

        const searchableElements =
          markdownContainer.querySelectorAll("h1, h2, h3, p, li");

        const escapedSearchTerm = searchTerm.replace(
          /[-\/\\^$*+?.()|[\]{}]/g,
          "\\$&"
        );` +
  'const searchRegex = new RegExp(`(${escapedSearchTerm})`, "gi");' +
  `searchableElements.forEach((el) => {
          const text = el.innerHTML;
          if (text.toLowerCase().includes(searchTerm)) {
            el.innerHTML = text.replace(searchRegex, "<mark>$1</mark>");
          }
        });

        matches = Array.from(markdownContainer.querySelectorAll("mark"));
        nextMatchBtn.style.display = matches.length > 1 ? "block" : "none";

        if (matches.length > 0) {
          scrollToMatch(matches[0]);
        }
      }

      // Event Listeners
      searchInput.addEventListener("input", () => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(performSearch, 300);
      });

      nextMatchBtn.addEventListener("click", () => {
        if (matches.length > 0) {
          currentIndex = (currentIndex + 1) % matches.length;
          scrollToMatch(matches[currentIndex]);
        }
      });
    </script>
  </body>
</html>

`;
