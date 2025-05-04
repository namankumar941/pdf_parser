const example = ` 
then it is to be added in html framework page at its respective position as:
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans bg-gray-100 p-5">
  <h1 class="text-center text-3xl mb-6">Image Cards</h1>
  <div class="flex flex-col items-center gap-5">
    <div
      class="bg-white rounded-lg shadow-lg overflow-hidden w-72 transition-transform duration-200 hover:scale-105"
    >
      <img src="img-0.jpeg" alt="Image 1" class="w-full h-auto" />
      <div class="p-4 text-center">
        <h2 class="text-xl font-semibold">Image 1</h2>
      </div>
    </div>
    <div
      class="bg-white rounded-lg shadow-lg overflow-hidden w-72 transition-transform duration-200 hover:scale-105"
    >
      <img src="img-1.jpeg" alt="Image 2" class="w-full h-auto" />
      <div class="p-4 text-center">
        <h2 class="text-xl font-semibold">Image 2</h2>
      </div>
    </div>
  </div>
</body>`;

exports.displayImage = `
- image tag should be present at there position and do not replace it with base 64 string.
- display images inside card components.
- should have a white background, rounded corners, a shadow effect, and a title below the image.
- The images should fully fit inside the card and the layout should be responsive and spaced out nicely.
- Keep the HTML code concise and clean, using minimal but effective Tailwind classes.
- follow the example given inside <example></example> tag.
- Add the <head>, <script>, and main content sections in their appropriate places within the HTML framework.

<example>
${example}
</example>

`;
