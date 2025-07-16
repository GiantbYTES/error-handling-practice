const ContactsDB = require("./services/contactService");
const Contact = require("./services/contact");
const validation = require("./utils/validation");
const fileUtils = require("./utils/fileUtils");
const ui = require("./commands/commandHandler");

const contactsDB = new ContactsDB();

function handleChoice(choise) {
  switch (choise) {
    case "add":
      console.log("add");
      let name = process.argv[3];
      let email = process.argv[4];
      let phone = process.argv[5];

      try {
        validation.validName(name);
        validation.validEmail(email);
        validation.validPhone(phone);
        validation.isEmailExists(contactsDB.getContactList(), email)

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
        ui.handleList(contactsDB.getContactList());
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "search":
      console.log("search");
     try {
        let toReturn;
        if (validation.isEmail(process.argv[3])) {
          validation.validEmail(process.argv[3]);
          toReturn = contactsDB.getContactByEmail(process.argv[3]);
        } else if (validation.isName(process.argv[3])) {
          validation.validName(process.argv[3]);
          toReturn = contactsDB.getContactByName(process.argv[3]);
        }
        ui.handleSearch(toReturn, contactsDB.contactsList.length);
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

function updateList() {
  const file = fileUtils.readFromFile("../contacts.json").contactsList;
  file.forEach((c) => {
    const contact = new Contact(c.name, c.email, c.phone);
    contactsDB.contactsList.push(contact);
  });
}

function run() {
try {
    validation.isValidCommand(process.argv);
  } catch (err) {
    ui.handleError(err);
    return;
  }

  if (fileUtils.isFileExist("../contacts.json")) {
    updateList();
  }
  let choice = process.argv[2];
  handleChoice(choice);
}

run();
