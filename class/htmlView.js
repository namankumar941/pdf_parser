//----------------------------------------------class----------------------------------------------

class htmlviewClass {
  htmlview(data) {
    let headScript = data.head.join("\n");
    let bodyScript = data.bodyScript.join("\n");

    const head = `
    <head>
      <meta charset="UTF-8" />
      <title>PDF DashBoard</title>
      <script src="https://cdn.tailwindcss.com"></script>
      ${headScript}
    </head>
    `;

    const sideBar = `    
    <aside
      class="w-1/4 bg-gray-100 border-r border-gray-300 overflow-y-auto"
      id="sidebar"
    >
      <h1
        class="text-2xl font-bold underline p-4 border-b border-gray-200 text-black"
        style="font-family: 'Dancing Script', cursive"
      >
        PDF Overview
      </h1>
    </aside>
    `;

    const mainContentArea = `    
    <main class="flex-1 h-screen overflow-y-auto" id="markdownContainer">
      <header
        class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10"
      >
        <h2 class="text-xl font-semibold text-gray-700">Content</h2>
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
            placeholder="Search content..."
            class="w-48 px-3 py-1.5 border rounded-lg text-sm"
          />
        </div>
      </header>
      <section class="p-6">
        <div class="max-w-4xl mx-auto" id="content">
        </div>
      </section>
    </main>
    `;

    const searchRegex = "new RegExp(`(${escapedSearchTerm})`, 'gi')";
    const searchBarScript = `  
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
        /[-/\^$*+?.()|[]{}]/g,
        "\$&"
      );
      const searchRegex =${searchRegex};
      searchableElements.forEach((el) => {
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
    `;

    const headingContentId = "`heading-${headingIndex}`";
    const subheadingContentId =
      "`subheading-${headingIndex}-${subheadingIndex}`";
    const subSubheadingContentId =
      "`sub-subheading-${headingIndex}-${subheadingIndex}-${subSubIndex}`";

    const mainScript = ` <script>
    const data = {
      body: ${JSON.stringify(data.body)} 
      };

    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    while (content.children.length > 1) {
      content.removeChild(content.lastChild);
    }

    content.innerHTML = "";

    data.body.forEach((heading, headingIndex) => {
      const headingEl = document.createElement("div");
      headingEl.className =
        "font-bold cursor-pointer mt-4 p-2 bg-gray-300 rounded heading";
      headingEl.textContent = heading.heading.trim() || "Details";
      sidebar.appendChild(headingEl);

      const contentSections = [];
      const headingContentId = ${headingContentId};
      const mainHeadingSection = document.createElement("div");
      mainHeadingSection.className = "mb-8";
      mainHeadingSection.id = headingContentId;

      const mainHeadingElement = document.createElement("h2");
      mainHeadingElement.className =
        "text-2xl font-bold text-blue-700 border-b-2 border-blue-500 pb-2 mb-4";
      // Display 'Details' if heading is empty but has content
      mainHeadingElement.textContent = heading.heading.trim() || "Details";
      mainHeadingSection.appendChild(mainHeadingElement);
      contentSections.push(mainHeadingSection);

      if (Array.isArray(heading.content)) {
        const subheadingList = document.createElement("div");
        subheadingList.className = "ml-2 hidden subheadings";
        sidebar.appendChild(subheadingList);

        headingEl.addEventListener("click", () => {
          document.querySelectorAll(".heading").forEach((el) => {
            if (el !== headingEl) el.classList.remove("active");
          });
          headingEl.classList.toggle("active");
          subheadingList.classList.toggle("hidden");

          document.getElementById(headingContentId).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });

        heading.content.forEach((subheadingItem, subheadingIndex) => {
          // Handle the case where content items are either HTML strings or subheading objects
          if (typeof subheadingItem === "string") {
            const contentContainer = document.createElement("div");
            contentContainer.className = "mt-4";
            contentContainer.innerHTML = subheadingItem;
            mainHeadingSection.appendChild(contentContainer);
          } else if (subheadingItem && "subheading" in subheadingItem) {
            // This is a subheading object
            const subheadingEl = document.createElement("div");
            subheadingEl.className =
              "cursor-pointer p-2 my-1 bg-gray-50 rounded hover:text-blue-600 subheading";
            subheadingEl.textContent =
              subheadingItem.subheading.trim() || "Details";
            subheadingList.appendChild(subheadingEl);

            const subheadingContentId = ${subheadingContentId};
            const subHeadingSection = document.createElement("div");
            subHeadingSection.className = "ml-4 mb-6";
            subHeadingSection.id = subheadingContentId;

            const subHeadingElement = document.createElement("h3");
            subHeadingElement.className =
              "text-xl font-semibold text-green-600 mt-5 italic mb-4";
            // Display 'Details' if subheading is empty but has content
            subHeadingElement.textContent =
              subheadingItem.subheading.trim() || "Details";
            subHeadingSection.appendChild(subHeadingElement);
            contentSections.push(subHeadingSection);

            if (Array.isArray(subheadingItem.content)) {
              const subSubheadingList = document.createElement("div");
              subSubheadingList.className = "ml-4 hidden sub-subheadings";
              subheadingEl.appendChild(subSubheadingList);

              subheadingEl.addEventListener("click", (e) => {
                e.stopPropagation();
                document.querySelectorAll(".subheading").forEach((el) => {
                  if (el !== subheadingEl) el.classList.remove("active");
                });
                subheadingEl.classList.toggle("active");
                subSubheadingList.classList.toggle("hidden");

                document.getElementById(subheadingContentId).scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              });

              subheadingItem.content.forEach((subSubItem, subSubIndex) => {
                if (typeof subSubItem === "string") {
                  // If it's a string, add it directly to the subheading section
                  const contentContainer = document.createElement("div");
                  contentContainer.className = "ml-6";
                  contentContainer.innerHTML = subSubItem;
                  subHeadingSection.appendChild(contentContainer);
                } else if (subSubItem && "sub-subheading" in subSubItem) {
                  // This is a sub-subheading object
                  const subSubheadingEl = document.createElement("div");
                  subSubheadingEl.className =
                    "cursor-pointer p-1 my-1 text-gray-600 hover:text-blue-600 sub-subheading";
                  // Display 'Details' if sub-subheading is empty but has content
                  subSubheadingEl.textContent =
                    subSubItem["sub-subheading"].trim() || "Details";
                  subSubheadingList.appendChild(subSubheadingEl);

                  const subSubheadingContentId = ${subSubheadingContentId};
                  const subSubSection = document.createElement("div");
                  subSubSection.className = "ml-8 mb-6";
                  subSubSection.id = subSubheadingContentId;

                  const subSubHeadingElement = document.createElement("h4");
                  subSubHeadingElement.className =
                    "text-lg font-medium text-purple-600 mb-3 pl-2 border-l-4 border-purple-400";
                  // Display 'Details' if sub-subheading is empty but has content
                  subSubHeadingElement.textContent =
                    subSubItem["sub-subheading"].trim() || "Details";
                  subSubSection.appendChild(subSubHeadingElement);

                  if (subSubItem.content) {
                    const contentContainer = document.createElement("div");
                    contentContainer.className = "ml-6";
                    contentContainer.innerHTML = subSubItem.content;
                    subSubSection.appendChild(contentContainer);
                  }

                  subHeadingSection.appendChild(subSubSection);

                  subSubheadingEl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    document
                      .getElementById(subSubheadingContentId)
                      .scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  });
                }
              });
            } else if (subheadingItem.content) {
              // If content is not an array, assume it's a string
              const contentContainer = document.createElement("div");
              contentContainer.className = "ml-6";
              contentContainer.innerHTML = subheadingItem.content;
              subHeadingSection.appendChild(contentContainer);

              subheadingEl.addEventListener("click", (e) => {
                e.stopPropagation();
                document.getElementById(subheadingContentId).scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              });
            }
          }
        });
      } else if (heading.content) {
        // If content is not an array, assume it's a string
        const contentContainer = document.createElement("div");
        contentContainer.className = "mt-4";
        contentContainer.innerHTML = heading.content;
        mainHeadingSection.appendChild(contentContainer);

        headingEl.addEventListener("click", () => {
          document.getElementById(headingContentId).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }

      contentSections.forEach((section) => {
        content.appendChild(section);
      });
    });
  </script>
  `;

    const finalCode = `
<!DOCTYPE html>
  <html lang="en">
    ${head}
    <body class="m-0 font-sans h-screen flex overflow-hidden">
      ${sideBar}
      ${mainContentArea}
    </body>
    ${mainScript}
    ${searchBarScript}
    <script>
    ${bodyScript}
    </script>
  </html>
    `;
    return finalCode;
  }
}

module.exports = htmlviewClass;
