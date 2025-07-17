const Contact = require("../services/contact");

const contact = new Contact("Jake Smith", "jake@example.com", "123-456-7890");

test("getContact should return the contact object", () => {
  const contactObj = contact.getContact();
  expect(contactObj).toEqual({
    name: "Jake Smith",
    email: "jake@example.com",
    phone: "123-456-7890",
  });
});

test("getName should return the contact's name", () => {
  const name = contact.getName();
  expect(name).toBe("Jake Smith");
});

test("getEmail should return the contact's email", () => {
  const email = contact.getEmail();
  expect(email).toBe("jake@example.com");
});

test("getPhone should return the contact's phone number", () => {
  const phone = contact.getPhone();
  expect(phone).toBe("123-456-7890");
});
test("strToPrint should return a formatted string of the contact", () => {
  const str = contact.strToPrint();
  expect(str).toBe("Jake Smith - jake@example.com - 123-456-7890");
});
