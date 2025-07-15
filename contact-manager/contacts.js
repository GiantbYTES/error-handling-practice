const ContactsDB = require("./services/contactService");
const validation = require("./utils/validation");
const fileUtils = require("./utils/fileUtils");
const ui = require("./commands/commandHandler");

const contactsDB = new ContactsDB();

function handleChoice(choise) {
  switch (choise) {
    case "add":
      console.log("add");
      validation.validName(argv[3]);
      validation.validEmail(argv[4]);
      validation.validPhone(argv[5]);
      let name = argv[3];
      let email = argv[4];
      let phone = argv[5];
      contactsDB.addContact(name, email, phone);
      fileUtils.writeToFile("../contacts.json", contactsDB);
      ui.handleAdd(name, contactsDB.length);
      break;
    case "delete":
      console.log("delete");
      validation.validEmail(argv[3]);
      const result = contactsDB.deleteContact(argv[3]);
      fileUtils.writeToFile("../contacts.json", contactsDB);
      ui.handleDelete(argv[3], result, contactsDB.length);
      break;
    case "list":
      console.log("list");
      ui.handleDelete(contactsDB.getContactList());
      break;
    case "search":
      console.log("search");
      let toReturn;
      let type;
      if (validation.isEmail(argv[3])) {
        validation.validEmail(argv[3]);
        type = "Email";
        toReturn = contactsDB.getContactByEmail;
      } else if (validation.isName(argv[3])) {
        validation.validName(argv[3]);
        type = "Name";
        toReturn = contactsDB.getContactByName;
      }
      ui.handleSearch(type, toReturn, contactsDB.length);
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
  validation.isValidCommand(process.argv);

  handleChoice(choice);
}
run();
