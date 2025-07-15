const ContactsDB = require("./services/contactService");
const validation = require("./utils/validation");
const fileUtils = require("./utils/fileUtils");
const ui = require("./commands/commandHandler");

const contactsDB = new ContactsDB();

function handleChoice(choise) {
  switch (choise) {
    case "add":
      console.log("add");
      try {
        validation.validName(process.argv[3]);
        validation.validEmail(process.argv[4]);
        validation.validPhone(process.argv[5]);
        let name = process.argv[3];
        let email = process.argv[4];
        let phone = process.argv[5];
        contactsDB.addContact(name, email, phone);
        fileUtils.writeToFile("../contacts.json", contactsDB);
        ui.handleAdd(name, contactsDB.contactsList.length);
      } catch (err) {
        ui.handleError(err);
      }
      break;
    case "delete":
      console.log("delete");
      validation.validEmail(process.argv[3]);
      const result = contactsDB.deleteContact(process.argv[3]);
      fileUtils.writeToFile("../contacts.json", contactsDB);
      ui.handleDelete(process.argv[3], result, contactsDB.contactsList.length);
      break;
    case "list":
      console.log("list");
      ui.handleDelete(contactsDB.getContactList());
      break;
    case "search":
      console.log("search");
      let toReturn;
      let type;
      if (validation.isEmail(process.argv[3])) {
        validation.validEmail(process.argv[3]);
        type = "Email";
        toReturn = contactsDB.getContactByEmail;
      } else if (validation.isName(process.argv[3])) {
        validation.validName(process.argv[3]);
        type = "Name";
        toReturn = contactsDB.getContactByName;
      }
      ui.handleSearch(type, toReturn, contactsDB.contactsList.length);
      break;
    case "help":
      console.log("help");
      ui.handleHelp();
      break;
    default:
      throw new Error(
        "✗ Error: Unknown command 'invalidcommand'\n Usage: node contacts.js [add|list|search|delete|help] [arguments]"
      );
  }
}

function run() {
  // validation.isValidCommand(process.argv);
  let choice = process.argv[2];
  handleChoice(choice);
}
run();
