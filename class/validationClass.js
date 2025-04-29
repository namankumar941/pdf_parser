//----------------------------------------------class----------------------------------------------

class validationClass {
  validation(htmlString) {
    // Validate HTML response
    if (
      !htmlString.startsWith("<!DOCTYPE html>") ||
      !htmlString.includes("</html>")
    ) {
      return 1;
    }
    return 0;
  }
}

module.exports = validationClass;
