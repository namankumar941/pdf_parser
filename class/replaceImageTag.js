//----------------------------------------------class----------------------------------------------

class ReplaceImageTagClass {
  replaceImageWithBase64(htmlString, imageDataDict) {
    console.log("2.1");
    // Define a regex to match img tags
    const imgTagPattern = /<img\s+src=['"]([^'"]+)['"][^>]*>/g;

    // Function to convert image file path to base64
    function encodeImageToBase64(imagePath) {
      console.log("4.1");
      if (imageDataDict[imagePath]) {
        return imageDataDict[imagePath];
      }
      console.log("4.2");
      return null;
    }

    // Replace <img> tags with base64-encoded images
    function replaceMatch(match, imgSrc) {
      console.log("3.1");
      const base64Data = encodeImageToBase64(imgSrc);
      if (base64Data) {
        return `<img src="${base64Data}" alt="${imgSrc}">`;
      }
      console.log("3.2");
      return match; // If no base64 found, return original match
    }
    console.log("2.2");
    // Use replace to replace img src with base64
    const updatedHtml = htmlString.replace(imgTagPattern, replaceMatch);
    console.log("2.3");
    return updatedHtml;
  }

  replaceImageTag(uiOutput, imagesList) {
    console.log("1.1");
    let imgBase = {};
    for (let i = 0; i < imagesList.length; i++) {
      let first = imagesList[i].reduce((acc, img) => {
        acc[img.id] = img.imageBase64;
        return acc;
      }, {});
      Object.assign(imgBase, first);
    }
    console.log("1.2");
    uiOutput.html = this.replaceImageWithBase64(uiOutput.html, imgBase);
    console.log("1.3");
  }
}

module.exports = ReplaceImageTagClass;
