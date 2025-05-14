//----------------------------------------------class----------------------------------------------
class FixJsonBackslashesClass {
  evenOutBackslashes(str) {
    // Match sequences of backslashes not immediately followed by a special escape character
    // Special escape chars: ", \, n, t, r, b, f
    return str.replace(/(\\+)(?!["\\ntrbf])/g, (match) => {
      // If the length of backslashes is odd, make it even
      return match.length % 2 === 1 ? match + "\\" : match;
    });
  }

  fixJsonBackslashes(obj) {
    if (typeof obj === "string") {
      return this.evenOutBackslashes(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(this.fixJsonBackslashes);
    } else if (obj !== null && typeof obj === "object") {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = this.fixJsonBackslashes(obj[key]);
      }
      return newObj;
    }
    return obj;
  }
}
module.exports = FixJsonBackslashesClass;
