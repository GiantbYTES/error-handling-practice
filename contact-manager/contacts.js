const ContactsDB = require("./services/contactService");
const Contact = require("./services/contact");
const validation = require("./utils/validation");
const fileUtils = require("./utils/fileUtils");
const ui = require("./commands/commandHandler");

const contactsDB = new ContactsDB();

function handleChoice(choise) {
  switch (choise) {
    case "add":
      let name = process.argv[3];
      let email = process.argv[4];
      let phone = process.argv[5];

      try {
        validation.validName(name);
        validation.validEmail(email);
        validation.validPhone(phone);
        console.log(`✓ Loaded ${contactsDB.getContactList().length} contacts`);
        validation.isEmailExists(contactsDB.getContactList(), email);

        contactsDB.addContact(name, email, phone);
        fileUtils.writeToFile("../contacts.json", contactsDB);
        ui.handleAdd(name, contactsDB.getContactList().length);
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "delete":
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
      try {
        ui.handleList(contactsDB.getContactList());
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "search":
      try {
        let toReturn;
        const input = process.argv[3];
        if (validation.isEmail(input)) {
          validation.validEmail(input);
          toReturn = contactsDB.getContactByEmail(input);
        } else if (validation.isName(input)) {
          validation.validName(input);
          toReturn = contactsDB.getContactByName(input);
        }
        ui.handleSearch(input, toReturn, contactsDB.contactsList.length);
      } catch (err) {
        ui.handleError(err);
      }
      break;

    case "help":
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
