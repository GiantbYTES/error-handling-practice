const fs = require('fs');

let readFileWithErrorHandling = function (fileName, callback) {
    fs.readFile(fileName, 'utf8', (error, data) => {
        if (error) {
            if (error.code === 'ENOENT') {
                return callback(`File not found: ${fileName}`);
            } else if (error.code === 'EISDIR') {
                return callback(`Error: ${fileName} is a directory, not a file`);
            } 
            return;
        }
        const fileSizeBytes = Buffer.byteLength(data, 'utf8');
        callback(`File read successfully. Size: ${fileSizeBytes} bytes`);
    });
}

readFileWithErrorHandling('existing.txt', (result) => {
    console.log(result);
    // Success: "File read successfully. Size: 150 bytes"
    // Or error: "File not found: existing.txt"
});


