const Contact = require("./contact");

class ContactsDB {
  constructor() {
    this.contactsList = [];
  }
  addContact(name, email, phone) {
    const newContact = new Contact(name, email, phone);
    this.contactsList.push(newContact);
    return 1;
  }
   deleteContact(email) {
    const index = this.getIndexByEmail(email);
    if (index !== -1) {
      let toDelete = this.contactsList[this.getIndexByEmail(email)];
      this.contactsList.splice(this.getIndexByEmail(email), 1);
      return toDelete;
    }
    return -1;
  }
  getContactList() {
    return this.contactsList;
  }

  getIndexByName(name) {
    for (let i = 0; i < this.contactsList.length; i++) {
      const contact = this.contactsList[i];
      if (contact.getName() === name) {
        return i;
      }
    }
    return -1;
  }
  getIndexByEmail(email) {
    for (let i = 0; i < this.contactsList.length; i++) {
      const contact = this.contactsList[i];
      if (contact.getEmail() === email) {
        return i;
      }
    }
    return -1;
  }

  getContactByName(name) {
    const index = this.getIndexByName(name);
    if (index !== -1) {
      return this.contactsList[this.getIndexByName(name)];
    }
    return -1;
  }
  getContactByEmail(email) {
    const index = this.getIndexByName(email);
    if (index !== -1) {
      return this.contactsList[this.getIndexByEmail(email)];
    }
    return -1;
  }
}

module.exports = ContactsDB;

// const contDB = new ContactsDB();
// contDB.addContact("Dave", "asdfasd@asdf", "123");
// console.log(contDB.getContactByName("Dave"));
// contDB.addContact("Sarah", "12f@asdf", "456");
// console.log(contDB.getContactByEmail("12f@asdf").getContact());
// console.log(contDB.deleteContact("asdfasd@asdf"));
// console.log(contDB.getContactByName("Dave"));
