import {describe, expect, test} from '@jest/globals';

const Validator = require("Tools/validator.js");
const ValidationError = require("Exception/validationError.js");

describe("Validator class tests", () => {
    const myTestValidator = new Validator();

    test("Validator class exists", () => {
        expect(myTestValidator).toBeInstanceOf(Validator);
    });

    test("Validator can check string is long enough", () => {
        expect(myTestValidator.stringIsLongEnough("Abc", 3, "name")).toBe(true);
    });

    test("Validator throw ValidationError if string is not long enough", () => {
        expect(() => { myTestValidator.stringIsLongEnough("Ab", 3, "name") }).toThrow("Property \"name\" has to be at least 3 characters long");
        expect(() => { myTestValidator.stringIsLongEnough("Ab", 3, "name") }).toThrow(ValidationError);
    });

    test("Validator can check string is short enough", () => {
        expect(myTestValidator.stringIsShortEnough("Abcdefghijklmopq", 16, "name")).toBe(true);
    });

    test("Validator throw ValidationError if string is too long", () => {
        expect(() => { myTestValidator.stringIsShortEnough("Abcd", 3, "name") }).toThrow("Property \"name\" cannot be longer than 3 characters long");
        expect(() => { myTestValidator.stringIsShortEnough("Abcd", 3, "name") }).toThrow(ValidationError);
    });

    test("Validator can check string is letters only", () => {
        expect(myTestValidator.stringHasOnlyLetters("Abcdefghijklmopq", "name")).toBe(true);
    });

    test("Validator throw error if string is not letter only", () => {
        expect(() => { myTestValidator.stringHasOnlyLetters("Abcdefgh ijklmopq", "name") }).toThrow("Property \"name\" has to be letters only");
        expect(() => { myTestValidator.stringHasOnlyLetters("Abcdefgh ijklmopq", "name") }).toThrow(ValidationError);
    });

    test("Validator can check string is letters only", () => {
        expect(myTestValidator.stringHasOnlyLettersAndNumbers("Abcdefghi1234q", "name")).toBe(true);
    });

    test("Validator throw error if string is not letter only", () => {
        expect(() => { myTestValidator.stringHasOnlyLettersAndNumbers("Abcdefghi1234q&", "name") }).toThrow("Property \"name\" has to be letters and numbers only");
        expect(() => { myTestValidator.stringHasOnlyLettersAndNumbers("Abcdefghi1234q&", "name") }).toThrow(ValidationError);
    });

    test("Validator can check string starts with a letter", () => {
        expect(myTestValidator.stringStartsWithALetter("Abcdefghi1234q", "name")).toBe(true);
    });

    test("Validator throw error if string doesn't start with a letter", () => {
        expect(() => { myTestValidator.stringStartsWithALetter("2bcdefghi1234q", "name") }).toThrow("Property \"name\" has to start with a letter");
        expect(() => { myTestValidator.stringStartsWithALetter("2bcdefghi1234q", "name") }).toThrow(ValidationError);
    });

    test("Validator can check if string has a minimum number of letters", () => {
        expect(myTestValidator.stringHasAtLeastNLetters("adv123", 3, "name")).toBe(true);
    });

    test("Validator throw error if string doesn't have a minimum number of letters", () => {
        expect(() => { myTestValidator.stringHasAtLeastNLetters("adv123", 4, "name") }).toThrow("Property \"name\" has to contain at least " + 4 + " letters");
        expect(() => { myTestValidator.stringHasAtLeastNLetters("adv123", 4, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringHasAtLeastNLetters("123", 4, "name") }).toThrow("Property \"name\" has to contain at least " + 4 + " letters");
        expect(() => { myTestValidator.stringHasAtLeastNLetters("123", 4, "name") }).toThrow(ValidationError);
    });

    test("Validator can check if string has at least one capitalised letter", () => {
        expect(myTestValidator.stringHasAtLeastNCapitalisedLetters("Adv123", 1, "name")).toBe(true);
    });

    test("Validator throw error if string doesn't contain at least one capitalised letter", () => {
        expect(() => { myTestValidator.stringHasAtLeastNCapitalisedLetters("2bcdefghi1234q", 2, "name") }).toThrow("Property \"name\" has to contain at least " + 2 + " capitalised letters");
        expect(() => { myTestValidator.stringHasAtLeastNCapitalisedLetters("2bcdefghi1234q", 2, "name") }).toThrow(ValidationError);
    });

    test("Validator can check if string has at least one special character", () => {
        expect(myTestValidator.stringHasAtLeastNSpecialCharacters("Adv123&", 1, "name")).toBe(true);
    });

    test("Validator throw error if string doesn't contain at least one special character", () => {
        expect(() => { myTestValidator.stringHasAtLeastNSpecialCharacters("2bcdefghi1234q", 1, "name") }).toThrow("Property \"name\" has to contain at least " + 1 + " special character");
        expect(() => { myTestValidator.stringHasAtLeastNSpecialCharacters("2bcdefghi1234q", 1, "name") }).toThrow(ValidationError);
    });

    test("Validator throw error if email string has wrong format", () => {
        expect(() => { myTestValidator.stringIsEmail("abc-@mail.com", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc-@mail.com", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail("abc..def@mail.com", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc..def@mail.com", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail(".abc@mail.com", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail(".abc@mail.com", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail("abc#def@mail.com", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc#def@mail.com", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail("abc.def@mail.c", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc.def@mail.c", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail("abc.def@mail#archive.com", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc.def@mail#archive.com", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail("abc.def@mail", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc.def@mail", "email") }).toThrow(ValidationError);

        expect(() => { myTestValidator.stringIsEmail("abc.def@mail..com", "email") }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestValidator.stringIsEmail("abc.def@mail..com", "email") }).toThrow(ValidationError);
    });

    test("Validator can check if email string is valid", () => {
        expect(myTestValidator.stringIsEmail("test@email.com", "email")).toBe(true);
    });

    test("Validator can check several rules at a time", () => {
        const optionsOnlyLetters: object = {
            stringIsLongEnough: {
                length: 3
            },
            stringIsShortEnough: {
                length: 20
            },
            stringHasOnlyLetters: {}
        };

        expect(() => { myTestValidator.validateString("ab", optionsOnlyLetters, "name") }).toThrow("Property \"name\" has to be at least 3 characters long");
        expect(() => { myTestValidator.validateString("ab", optionsOnlyLetters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("abSDFsdfsdfsdfsdsddsfsdfsadfasdf", optionsOnlyLetters, "name") }).toThrow("Property \"name\" cannot be longer than 20 characters long");
        expect(() => { myTestValidator.validateString("abSDFsdfsdfsdfsdsddsfsdfsadfasdf", optionsOnlyLetters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("2bcdefghi1234q", optionsOnlyLetters, "name") }).toThrow("Property \"name\" has to be letters only");
        expect(() => { myTestValidator.validateString("2bcdefghi1234q", optionsOnlyLetters, "name") }).toThrow(ValidationError);

        expect(myTestValidator.validateString("Adfsdsddf", optionsOnlyLetters, "name")).toBe(true);

        const optionsLettersAndNumbersthatStartsWithALetter: object = {
            stringIsLongEnough: {
                length: 3
            },
            stringIsShortEnough: {
                length: 20
            },
            stringHasOnlyLettersAndNumbers: {},
            stringStartsWithALetter: {}
        };

        expect(() => { myTestValidator.validateString("ab", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow("Property \"name\" has to be at least 3 characters long");
        expect(() => { myTestValidator.validateString("ab", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("abSDFsdfsdfsdfsdsddsfsdfsadfasdf", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow("Property \"name\" cannot be longer than 20 characters long");
        expect(() => { myTestValidator.validateString("abSDFsdfsdfsdfsdsddsfsdfsadfasdf", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("2bc&defghi1234q", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow("Property \"name\" has to be letters and numbers only");
        expect(() => { myTestValidator.validateString("2bc&defghi1234q", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("2bcdefghi1234q", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow("Property \"name\" has to start with a letter");
        expect(() => { myTestValidator.validateString("2bcdefghi1234q", optionsLettersAndNumbersthatStartsWithALetter, "name") }).toThrow(ValidationError);

        expect(myTestValidator.validateString("abcdefghi1234q", optionsLettersAndNumbersthatStartsWithALetter, "name")).toBe(true);

        const optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters: object = {
            stringIsLongEnough: {
                length: 3
            },
            stringIsShortEnough: {
                length: 20
            },
            stringHasAtLeastNLetters: {
                numberOfLetters: 3
            },
            stringHasAtLeastNNumbers: {
                numberOfNumbers: 4
            },
            stringHasAtLeastNCapitalisedLetters: {
                numberOfCapitalisedLetters: 2
            },
            stringHasAtLeastNSpecialCharacters: {
                numberOfSpecialCharacter: 3
            }
        };

        expect(() => { myTestValidator.validateString("ab", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow("Property \"name\" has to be at least 3 characters long");
        expect(() => { myTestValidator.validateString("ab", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("abSDFsdfsdfsdfsdsddsfsdfsadfasdf", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow("Property \"name\" cannot be longer than 20 characters long");
        expect(() => { myTestValidator.validateString("abSDFsdfsdfsdfsdsddsfsdfsadfasdf", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("2q1321321a", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow("Property \"name\" has to contain at least 3 letters");
        expect(() => { myTestValidator.validateString("2q1321321a", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("asdfasdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow("Property \"name\" has to contain at least 4 numbers");
        expect(() => { myTestValidator.validateString("asdfasdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("4Asdfasdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow("Property \"name\" has to contain at least 2 capitalised letters");
        expect(() => { myTestValidator.validateString("4Asdfasdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow(ValidationError);

        expect(() => { myTestValidator.validateString("4ASdfasdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow("Property \"name\" has to contain at least 3 special characters");
        expect(() => { myTestValidator.validateString("4ASdfasdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name") }).toThrow(ValidationError);

        expect(myTestValidator.validateString("4ASdf& !asdf321", optionsMinLettersAndMinNumbersWithMinCapitalisedLettersAndSpecialCharacters, "name")).toBe(true);
    });
});