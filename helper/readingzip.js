const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");

const zipFilePath = "landin-page-ex.zip";

// Array to hold the extracted files
const files = [];

// Extract ZIP
fs.createReadStream(zipFilePath)
  .pipe(unzipper.Parse())
  .on("entry", (entry) => {
    const fileName = entry.path;
    const type = entry.type; // 'Directory' or 'File'

    if (type === "File") {
      // Read the file into a buffer
      entry.buffer().then((fileData) => {
        // Store the file data in the array
        files.push({
          name: fileName,
          data: fileData,
        });
      });
    } else {
      entry.autodrain();
    }
  })
  .promise()
  .then(
    () => {
      // Do something with the extracted files
      console.log(`Extracted ${files.length} files`);
    },
    (err) => {
      console.error("Error during extraction:", err);
    }
  );
