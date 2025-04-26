const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: false }));

const PageView = require("./class/pageview");
//----------------------------------------------multer----------------------------------------------

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destPath = path.resolve(`./public/pdf`);

    // Check if the directory exists at destination
    fs.access(destPath, fs.constants.F_OK, (err) => {
      if (err) {
        // If the directory does not exist, create one
        fs.mkdir(destPath, { recursive: true }, (err) => {
          if (err) {
            return callback(err);
          } else {
            return callback(null, destPath);
          }
        });
      } else {
        // If the directory exists, proceed
        return callback(null, destPath);
      }
    });
  },
  filename: function (req, file, callback) {
    const uniqueName = Date.now() + ".pdf";
    return callback(null, uniqueName);
  },
});
const upload = multer({ storage });

//created class instance
const pageView = new PageView();

//----------------------------------------------routes----------------------------------------------

//get request for main page
app.get("/", pageView.getUploadPdf.bind(pageView));
app.post(
  "/postUploadPdf",
  upload.single("pdf"),
  pageView.postUploadPdf.bind(pageView)
);

// starting server
app.listen(port, () => console.log("server started"));
