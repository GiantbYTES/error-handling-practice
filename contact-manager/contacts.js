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
        ui.handleAdd(name, contactsDB.getContactList().length);
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "delete":
      console.log("delete");
      try {
        validation.validEmail(process.argv[3]);
        const result = contactsDB.deleteContact(process.argv[3]);
        fileUtils.writeToFile("../contacts.json", contactsDB);
        ui.handleDelete(
          process.argv[3],
          result,
          contactsDB.contactsList.length
        );
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "list":
      console.log("list");
      try {
        ui.handleDelete(contactsDB.getContactList());
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "search":
      console.log("search");
      try {
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
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "help":
      console.log("help");
      ui.handleHelp();
      break;

    default:
      console.log("ERROR!");
      break;
  }
}

function run() {
  try {
    validation.isValidCommand(process.argv);
  } catch (err) {
    ui.handleError(err);
    return;
  }

  // still doesn't work when file doesn't exist
  contactsDB.contactsList =
  fileUtils.readFromFile("../contacts.json").contactsList;
  let choice = process.argv[2];
  handleChoice(choice);
}

run();
