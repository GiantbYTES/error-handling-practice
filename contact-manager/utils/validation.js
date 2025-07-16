function isName(nameInput) {
  if (/^[a-zA-Z ]+$/.test(nameInput)) {
    return true;
  }
  return false;
}

function validName(nameInput) {
  if (typeof nameInput !== "string")
    throw new Error("✗ Error: name must be a string");

  if (!/^[a-zA-Z ]+$/.test(nameInput)) {
    throw new Error("✗ Error: name can only contain letters and spaces.");
  }
}

function isEmail(strInput) {
  if (typeof strInput !== "string") return false;

  const atIndex = strInput.indexOf("@");
  if (atIndex === -1) return false;

  if (atIndex === 0 || atIndex === strInput.length - 1) return false;

  return true;
}

function validEmail(emailInput) {
  if (typeof emailInput !== "string")
    throw new Error("✗ Error: email must be a string");

  if (emailInput.length === 0)
    throw new Error("✗ Error: email cannot be empty");

  // Check for exactly one @ symbol
  const atIndex = emailInput.indexOf("@");
  if (atIndex === -1)
    throw new Error("✗ Error: email must contain an @ symbol");

  if (atIndex !== emailInput.lastIndexOf("@"))
    throw new Error("✗ Error: email cannot contain multiple @ symbols");

  // Split into local and domain parts
  const localPart = emailInput.substring(0, atIndex);
  const domainPart = emailInput.substring(atIndex + 1);

  // Check local part (before @)
  if (localPart.length === 0)
    throw new Error("✗ Error: email must have content before the @ symbol");

  if (localPart.includes(" "))
    throw new Error("✗ Error: email local part cannot contain spaces");

  // Check domain part (after @)
  if (domainPart.length === 0)
    throw new Error("✗ Error: email must have a domain after the @ symbol");

  if (domainPart.includes(" "))
    throw new Error("✗ Error: email domain cannot contain spaces");

  // Check for at least one dot in domain
  const dotIndex = domainPart.indexOf(".");

  if (dotIndex === -1)
    throw new Error("✗ Error: email domain must contain at least one dot");

  // Check that domain has content before and after the dot
  if (dotIndex === 0)
    throw new Error("✗ Error: email domain must have content before the dot");

  if (dotIndex === domainPart.length - 1)
    throw new Error("✗ Error: email domain must have content after the dot");
}

function validPhone(phoneNumStr) {
  if (typeof phoneNumStr !== "string")
    throw new Error("✗ Error: Phone number must be a string");

  if (phoneNumStr.length !== 12)
    throw new Error(
      "✗ Error: Phone number must be exactly 12 characters in XXX-XXX-XXXX format"
    );

  for (let i = 0; i < phoneNumStr.length; i++) {
    if (i === 3 || i === 7) {
      if (phoneNumStr[i] !== "-")
        throw new Error(
          `✗ Error: Phone number must have dashes at positions 4 and 8 (XXX-XXX-XXXX format)`
        );
    } else {
      if (phoneNumStr[i] < "0" || phoneNumStr[i] > "9")
        throw new Error(
          `✗ Error: Phone number must contain only digits and dashes.`
        );
    }
  }
}

// TODO: check each command individualy (accepts proccess.argv)
function isValidCommand(commandStr) {
  if (
    commandStr != "add" &&
    commandStr != "list" &&
    commandStr != "search" &&
    commandStr != "delete" &&
    commandStr != "help"
  ) {
    throw new Error(`✗ Error: Unknown command ${commandStr}.\n
            Usage: node app.js [add|list|search|delete|help] [arguments]`);
  }
}

function isEmailExists(arrOfContacts, emailAdress) {
  for (let contact of arrOfContacts) {
    if (contact.email === emailAdress) {
      return true;
    }
  }
  return false;
}

module.exports = {
  isName,
  validName,
  isEmail,
  validEmail,
  validPhone,
  isValidCommand,
  isEmailExists,
};
