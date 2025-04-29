//----------------------------------------------class----------------------------------------------

class ReplaceImageTagClass {
  replaceImageWithBase64(htmlString, imageDataDict) {
    // Define a regex to match img tags
    const imgTagPattern = /<img\s+src=['"]([^'"]+)['"][^>]*>/g;

    // Function to convert image file path to base64
    function encodeImageToBase64(imagePath) {
      if (imageDataDict[imagePath]) {
        return imageDataDict[imagePath];
      }
      return null;
    }

    // Replace <img> tags with base64-encoded images
    function replaceMatch(match, imgSrc) {
      const base64Data = encodeImageToBase64(imgSrc);
      if (base64Data) {
        return `<img src="${base64Data}" alt="${imgSrc}">`;
      }
      return match; // If no base64 found, return original match
    }
    // Use replace to replace img src with base64
    const updatedHtml = htmlString.replace(imgTagPattern, replaceMatch);
    return updatedHtml;
  }

  replaceImageTag(uiOutput, imagesList) {
    let imgBase = {};

    // Handle empty or invalid imagesList
    if (!Array.isArray(imagesList) || imagesList.length === 0) {
      return uiOutput;
    }

    // Build image base64 dictionary
    for (let i = 0; i < imagesList.length; i++) {
      if (Array.isArray(imagesList[i])) {
        let first = imagesList[i].reduce((acc, img) => {
          if (img && img.id && img.imageBase64) {
            acc[img.id] = img.imageBase64;
          }
          return acc;
        }, {});
        Object.assign(imgBase, first);
      }
    }
    // Replace image tags and return the updated HTML
    const updatedHtml = this.replaceImageWithBase64(uiOutput, imgBase);

    return updatedHtml;
  }
}

module.exports = ReplaceImageTagClass;
