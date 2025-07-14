let safeJsonParse = function (jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return "Invalid JSON format";
    }
}

console.log(safeJsonParse('{"name": "John"}')); 
// Output: { name: "John" }

console.log(safeJsonParse('invalid json')); 
// Output: "Invalid JSON format"
