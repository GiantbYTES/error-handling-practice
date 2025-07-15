const fs = require('fs');

// const path = require('path');
// const cs = require('contatctService')

// const filePath = path.join(__dirname, 'contacts.json');
// const contacts = cs.getContacts();
// const contacts = [{name: "aaa", phone: "666"}, {name: "bbb", phone: "777"}]



function writeToFile(filePath, contacts) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf8');
    console.log('Data written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}


function readFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log('File does not exist. Returning empty array.');
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);

  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

// function addUser(newUser) {
//   const currentData = readFromFile();
//   currentData.push(newUser);
//   writeToFile(currentData);
// }

// writeToFile()
// const arrOfContacts = readFromFile();