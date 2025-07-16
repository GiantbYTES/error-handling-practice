function handleAdd(contactName, numOfContacts) {
  if (numOfContacts === 1) {
    console.log("✗ File not found - creating new contact list");
  } else {
    console.log(`✓ Loaded ${numOfContacts - 1} contacts`);
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
    console.log(`✓ Contact deleted: ${result.getName()}`);
  }
}

function handleList(arrOfContacts) {
  console.log("Loading contacts from contacts.json...");
  console.log(`✓ Loaded ${arrOfContacts.length} contacts\n`);
  console.log("=== All Contacts ===");

  for (let i = 0; i < arrOfContacts.length; i++) {
    console.log(`${i + 1}. ${arrOfContacts[i].strToPrint()}`);
  }
}

function handleSearch(searchInput, contactObj, numOfContacts) {
  console.log("Loading contacts from contacts.json...");
  console.log(`✓ Loaded ${numOfContacts} contacts`);
  console.log(`=== Search Results for "${searchInput}" ===`);

  if (contactObj !== -1) {
    console.log(`1. ${contactObj.strToPrint()}`);
  } else {
    console.log(`No contacts found matching "${searchInput}"`);
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
