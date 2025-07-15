class Contact {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  getContact() {
    return { name: this.name, email: this.email, phone: this.phone };
  }

  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPhone() {
    return this.phone;
  }
  strToPrint() {
    return `${this.name} - ${this.email} - ${this.phone}`;
  }
}

module.exports = Contact;
// const dave = new Contact("Dave", "asyncWrapProviders", 123);
// console.log(dave);
// console.log(dave.getContact());
// console.log(dave.getName());
// console.log(dave.getEmail());
// console.log(dave.getPhone());
// console.log(dave.strToPrint());
