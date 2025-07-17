// const { addContact } = require("../services/contactService");
const ContactsDB = require("../services/contactService");
const Contact = require("../services/contact");

const contactsDB = new ContactsDB();

test("addContact should return 1 when contact is added", () => {
  const name = "John Doe";
  const email = "john@example.com";
  const phone = "555-123-4567";
  const result = contactsDB.addContact(name, email, phone);
  expect(result).toBe(1);
  console.log(contactsDB.contactsList[0]);
  expect(contactsDB.contactsList[0]).toEqual({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
  });
  expect(contactsDB.contactsList[0]).toBeInstanceOf(Contact);
});

test("addContact should add a contact with the correct properties", () => {
  const name = "Jane Doe";
  const email = "jane@example.com";
  const phone = "777-456-1234";
  contactsDB.addContact(name, email, phone);
  const contact = contactsDB.contactsList[1];
  expect(contact.name).toBe(name);
  expect(contact.email).toBe(email);
  expect(contact.phone).toBe(phone);
});

test("deleteContact should remove a contact by email", () => {
  const emailToDelete = "jane@example.com";
  const result = contactsDB.deleteContact(emailToDelete);
  expect(result).toEqual({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "777-456-1234",
  });
  expect(contactsDB.contactsList.length).toBe(1);
});

test("getContactList should return the list of contacts", () => {
  const contactList = contactsDB.getContactList();
  expect(contactList.length).toBe(1);
  expect(contactList[0].getContact()).toEqual({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
  });
});

test("getIndexByName should return the index of a contact by name", () => {
  const index = contactsDB.getIndexByName("John Doe");
  expect(index).toBe(0);
});

test("getIndexByEmail should return the index of a contact by email", () => {
  const index = contactsDB.getIndexByEmail("john@example.com");
  expect(index).toBe(0);
});

test("getContactByName should return the contact object by name", () => {
  const contact = contactsDB.getContactByName("John Doe");
  expect(contact).toBeInstanceOf(Contact);
  expect(contact.getContact()).toEqual({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
  });
});

test("getContactByEmail should return the contact object by email", () => {
  contactsDB.addContact("Bob Jackson", "bob@example.com", "123-456-7890");
  const contact = contactsDB.getContactByEmail("bob@example.com");
  expect(contact).toBeInstanceOf(Contact);
  expect(contact.getContact()).toEqual({
    name: "Bob Jackson",
    email: "bob@example.com",
    phone: "123-456-7890",
  });
});

test("getContactByEmail should return -1 if contact not found", () => {
  const contact = contactsDB.getContactByEmail("abc@exmaple.com");
  expect(contact).toBe(-1);
});
