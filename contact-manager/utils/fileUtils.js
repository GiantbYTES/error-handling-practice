const fs = require("fs");

function writeToFile(filePath, contacts) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

function readFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log("File does not exist. Returning empty array.");
      return [];
    }

    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function isFileExist(filePath) {
  return fs.existsSync(filePath);
}

module.exports = {
  writeToFile,
  readFromFile,
  isFileExist,
};
