const fs = require("fs");
//Ex1

const data = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  active: true,
  tags: ["sample"],
  details: {
    age: 30,
    city: "New York",
    country: "United States",
    phoneNumber: "(123) 456-7890",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
  },
};

function safeJsonParse(data) {
  try {
    return JSON.parse(data);
  } catch {
    console.log("Invalid JSON format");
  }
}

//Ex2

function readFileWithErrorHandling(fileName, callback) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return callback("File not found: existng.txt");
      } else if (err.code === "EISDIR") {
        return callback("Given a directory instead of file");
      }
      return;
    }
    callback(`File read succesfully. Size: ${data.length} bytes`);
  });
}

readFileWithErrorHandling("existing.txt", (result) => {
  console.log(result);
  // Success: "File read successfully. Size: 150 bytes"
  // Or error: "File not found: existing.txt"
});
