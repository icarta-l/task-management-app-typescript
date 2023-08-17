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
});