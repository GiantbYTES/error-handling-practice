const {
  isName,
  validName,
  isEmail,
  validEmail,
  validPhone,
  isValidCommand,
  isEmailExists,
} = require('../utils/validation');

describe('Validation Tests', () => {

  describe('isName function', () => {
    test('should return true for valid names with letters only', () => {
      expect(isName('John')).toBe(true);
      expect(isName('Jane Doe')).toBe(true);
      expect(isName('Mary Ann Smith')).toBe(true);
    });

    test('should return false for names with numbers or special characters', () => {
      expect(isName('John123')).toBe(false);
      expect(isName('Jane@Doe')).toBe(false);
      expect(isName('Mary-Ann')).toBe(false);
      expect(isName('')).toBe(false);
    });
  });

  describe('validName function', () => {
    test('should not throw error for valid names', () => {
      expect(() => validName('John')).not.toThrow();
      expect(() => validName('Jane Doe')).not.toThrow();
    });

    test('should throw error for non-string input', () => {
      expect(() => validName(123)).toThrow('✗ Error: name must be a string');
      expect(() => validName(null)).toThrow('✗ Error: name must be a string');
    });

    test('should throw error for invalid name formats', () => {
      expect(() => validName('John123')).toThrow('✗ Error: name can only contain letters and spaces.');
      expect(() => validName('Jane@Doe')).toThrow('✗ Error: name can only contain letters and spaces.');
    });
  });

  describe('isEmail function', () => {
    test('should return true for basic valid email formats', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user@domain.org')).toBe(true);
      expect(isEmail('mamatzav@sababa')).toBe(true);
    });

    test('should return false for invalid email formats', () => {
      expect(isEmail('notanemail')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail(123)).toBe(false);
    });
  });

  describe('validEmail function', () => {
    test('should not throw error for valid emails', () => {
      expect(() => validEmail('test@example.com')).not.toThrow();
      expect(() => validEmail('user@domain.org')).not.toThrow();
    });

    test('should throw error for non-string input', () => {
      expect(() => validEmail(123)).toThrow('✗ Error: email must be a string');
    });

    test('should throw error for empty email', () => {
      expect(() => validEmail('')).toThrow('✗ Error: email cannot be empty');
    });

    test('should throw error for missing @ symbol', () => {
      expect(() => validEmail('testexample.com')).toThrow('✗ Error: Email must contain an @ symbol');
    });

    test('should throw error for multiple @ symbols', () => {
      expect(() => validEmail('test@@example.com')).toThrow('✗ Error: Email cannot contain multiple @ symbols');
    });

    test('should throw error for missing local part', () => {
      expect(() => validEmail('@example.com')).toThrow('✗ Error: Email must have content before the @ symbol');
    });

    test('should throw error for missing domain', () => {
      expect(() => validEmail('test@')).toThrow('✗ Error: Email must have a domain after the @ symbol');
    });

    test('should throw error for spaces in email', () => {
      expect(() => validEmail('test user@example.com')).toThrow('✗ Error: Email local part cannot contain spaces');
      expect(() => validEmail('test@exam ple.com')).toThrow('✗ Error: Email domain cannot contain spaces');
    });

    test('should throw error for missing dot in domain', () => {
      expect(() => validEmail('test@example')).toThrow('✗ Error: Email domain must contain at least one dot');
    });
  });

  describe('validPhone function', () => {
    test('should not throw error for valid phone format', () => {
      expect(() => validPhone('123-456-7890')).not.toThrow();
      expect(() => validPhone('555-123-4567')).not.toThrow();
    });

    test('should throw error for non-string input', () => {
      expect(() => validPhone(1234567890)).toThrow('✗ Error: Phone number must be a string');
    });

    test('should throw error for incorrect length', () => {
      expect(() => validPhone('123-456-789')).toThrow('✗ Error: Phone number must be exactly 12 characters in XXX-XXX-XXXX format');
      expect(() => validPhone('123-456-78901')).toThrow('✗ Error: Phone number must be exactly 12 characters in XXX-XXX-XXXX format');
    });

    test('should throw error for missing dashes', () => {
      expect(() => validPhone('1234567890')).toThrow('✗ Error: Phone number must be exactly 12 characters in XXX-XXX-XXXX format');
    });

    test('should throw error for wrong dash positions', () => {
      expect(() => validPhone('123-4567-890')).toThrow('✗ Error: Phone number must have dashes at positions 4 and 8 (XXX-XXX-XXXX format)');
    });

    test('should throw error for non-digit characters', () => {
      expect(() => validPhone('abc-def-ghij')).toThrow('✗ Error: Phone number must contain only digits and dashes.');
    });
  });

  describe('isValidCommand function', () => {
    test('should not throw error for valid commands', () => {
      expect(() => isValidCommand(['node', 'app.js', 'list'])).not.toThrow();
      expect(() => isValidCommand(['node', 'app.js', 'help'])).not.toThrow();
    });

    test('should throw error for unknown commands', () => {
      expect(() => isValidCommand(['node', 'app.js', 'unknown']))
        .toThrow('✗ Error: Unknown command unknown.\nUsage: node app.js [add|list|search|delete|help] [arguments]');
    });

    test('should throw error for add command with missing arguments', () => {
      expect(() => isValidCommand(['node', 'app.js', 'add']))
        .toThrow('✗ Error: Missing arguments for \'add\' command.\nUsage: node contact.js add "name" "email" "phone"');
    });

    test('should throw error for delete command with missing arguments', () => {
      expect(() => isValidCommand(['node', 'app.js', 'delete']))
        .toThrow('✗ Error: Missing email argument for \'delete\' command.\nUsage: node contact.js delete "email"');
    });

    test('should throw error for search command with missing arguments', () => {
      expect(() => isValidCommand(['node', 'app.js', 'search']))
        .toThrow('✗ Error: Missing name argument for \'search\' command.\nUsage: node contact.js search "name"');
    });
  });

  describe('isEmailExists function', () => {
    const contacts = [
      { name: 'John', email: 'john@example.com', phone: '123-456-7890' },
      { name: 'Jane', email: 'jane@example.com', phone: '098-765-4321' }
    ];

    test('should throw error if email already exists', () => {
      expect(() => isEmailExists(contacts, 'john@example.com'))
        .toThrow('✗ Error: Contact with this email already exists');
    });

    test('should not throw error if email does not exist', () => {
      expect(() => isEmailExists(contacts, 'new@example.com')).not.toThrow();
    });
  });
});

