const splitPage = require("./splitPage");
const navigationBar = require("./navigationBar");
const searchBar = require("./searchBar");
const mainContectDisplay = require("./mainData");

exports.ui = `
${splitPage.splitPage}

${navigationBar.navigationBar}

${searchBar.searchBar}

${mainContectDisplay.mainContectDisplay}

`;
