function handleAdd(contactName, numOfContacts) {
  if (numOfContacts === 1) {
    console.log("✗ File not found - creating new contact list");
  } else {
    console.log(`✓ Loaded ${numOfContacts} contacts`);
  }
  console.log(`✓ Contact added: ${contactName}`);
  console.log(`✓ Contact saved to contacts.json`);
}

function handleDelete(emailOfUserTodelete, result, numOfContacts) {
  console.log("Loading contacts from contacts.json...");
  console.log(`✓ Loaded ${numOfContacts} contacts`);

  if (result == -1) {
    console.log(`Error: No contact found with email: ${emailOfUserTodelete}`);
  } else {
    console.log(`✓ Contact deleted: ${result.name}`);
  }
}

function handleList(arrOfContacts) {
  console.log("Loading contacts from contacts.json...");
  console.log(`✓ Loaded ${arrOfContacts.length} contacts`);
  console.log("=== All Contacts ===");

  for (let i = 0; i < arrOfContacts.length; i++) {
    console.log(
      `${i + 1}. ${arrOfContacts[i].name} - ${arrOfContacts[i].mail} - ${
        arrOfContacts[i].phone
      }`
    );
  }
}

function handleSearch(contactObj, numOfContacts) {
  console.log("Loading contacts from contacts.json...");
  console.log(`✓ Loaded ${numOfContacts} contacts`);
  console.log(`=== Search Results for ${contactObj.name} ===`);

  if (typeof contactObj === "Contact") {
    console.log(
      `1. ${arrOfContacts[i].name} - ${arrOfContacts[i].mail} - ${arrOfContacts[i].phone}`
    );
  } else {
    console.log(`No contacts found matching ${contactObj.name}`);
  }
}

function handleHelp() {
  showUsage();
}

function handleError(err) {
  console.log(err.message);
}

function showUsage() {
  console.log(`
    Usage: node contacts.js [command] [arguments]

    Commands:
    add "name" "email" "phone"  - Add a new contact
    list                        - List all contacts
    search "query"              - Search contacts by name or email
    delete "email"              - Delete contact by email
    help                        - Show this help message

    Examples:
    node contacts.js add "John Doe" "john@example.com" "555-123-4567"
    node contacts.js search "john"
    node contacts.js delete "john@example.com"
    `);
}

module.exports = {
  handleAdd,
  handleDelete,
  handleList,
  handleSearch,
  handleHelp,
  handleError,
  showUsage,
};
