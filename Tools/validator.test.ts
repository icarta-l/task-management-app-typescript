import {beforeAll, describe, expect, test} from '@jest/globals';
const Validator = require("./validator.ts");
const ValidationError = require("../Exception/validationError.ts");

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

    test("Validator throw error if string doesn't contain at least one capitalised letter", () => {
        expect(() => { myTestValidator.stringHasAtLeastNCapitalisedLetters("2bcdefghi1234q", 2, "name") }).toThrow("Property \"name\" has to contain at least " + 2 + " capitalised letters");
        expect(() => { myTestValidator.stringHasAtLeastNCapitalisedLetters("2bcdefghi1234q", 2, "name") }).toThrow(ValidationError);
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
    });
});