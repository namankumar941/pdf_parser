exports.displayImage = ` <step order="3d">
      For each &lt;img&gt; tag:
        • Keep original tag.
        • Wrap in a responsive card using Tailwind: white bg, rounded corners, shadow, title below.
        • Fit image inside card, spaced nicely.
        • if image tag present in markdown (![img-0.jpeg](img-0.jpeg) then represent it as: 
            "<div class='bg-white rounded-lg shadow-lg overflow-hidden w-full transition-transform duration-200 hover:scale-105'><img src='img-0.jpeg' alt='Image 1' class='w-full h-auto' /><div class='p-4 text-center'><h2 class='text-xl font-semibold'>Image 1</h2></div></div>"
        • Normal text above or below the image tag should be added in the final html code at their respective position.
      CRITICAL REQUIREMENT (MUST FOLLOW):
      - image tag should be present at its respective position (ie. <img src='img-0.jpeg' alt='Image 1' class='w-full h-auto' />)
      - Before sending final response make sure all data of markdown string is present in the final html code.
      - The HTML or JavaScript code string added to the final response should be on a single line and must not contain any newline characters or span multiple lines.
      - do not alter ant text inside markdown string while placing it inside response json
      </step>`;
