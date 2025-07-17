const { writeToFile, readFromFile, isFileExist } = require('../utils/fileUtils');

describe('FileUtils Tests', () => {

  describe('writeToFile function', () => {
    test('should write contacts to file', () => {
      const contacts = [
        { name: 'John', email: 'john@test.com', phone: '123-456-7890' }
      ];
      
      writeToFile('./test.json', contacts);
      
      expect(isFileExist('./test.json')).toBe(true);
    });
  });

  describe('readFromFile function', () => {
    test('should read contacts from file', () => {
      const contacts = [
        { name: 'Jane', email: 'jane@test.com', phone: '098-765-4321' }
      ];
      
      writeToFile('./test2.json', contacts);
      const result = readFromFile('./test2.json');
      
      expect(result).toEqual(contacts);
    });

    test('should return empty array for non-existent file', () => {
      const result = readFromFile('./nonexistent.json');
      
      expect(result).toEqual([]);
    });
  });

  describe('isFileExist function', () => {
    test('should return true for existing file', () => {
      writeToFile('./test3.json', []);
      
      expect(isFileExist('./test3.json')).toBe(true);
    });

    test('should return false for non-existent file', () => {
      expect(isFileExist('./doesnotexist.json')).toBe(false);
    });
  });
});