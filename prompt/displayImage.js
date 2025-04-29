exports.displayImage = `
- image tag should be present at there position and do not replace it with base 64 string.
- display images inside card components.
- should have a white background, rounded corners, a shadow effect, and a title below the image.
- The images should fully fit inside the card and the layout should be responsive and spaced out nicely.
- follow the example given inside <example></example> tag.
<example>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }

    .card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .card {
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 300px;
      transition: transform 0.2s ease;
    }

    .card:hover {
      transform: scale(1.03);
    }

    .card img {
      width: 100%;
      height: auto;
      display: block;
    }

    .card-body {
      padding: 15px;
      text-align: center;
    }

    .card-title {
      font-size: 1.2em;
      margin: 0;
    }
  </style>
  <body>
    <h1 style="text-align: center">Image Cards</h1>
    <div class="card-container">
      <div class="card">
        <img src="img-0.jpeg" alt="Image 1" />
        <div class="card-body">
          <h2 class="card-title">Image 1</h2>
        </div>
      </div>
      <div class="card">
        <img src="img-1.jpeg" alt="Image 2" />
        <div class="card-body">
          <h2 class="card-title">Image 2</h2>
        </div>
      </div>
    </div>
  </body>
</example>

`;
