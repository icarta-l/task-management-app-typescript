import {beforeAll, describe, expect, test} from '@jest/globals';
const bcrypt = require('bcrypt');
const User = require("./user.ts");
const ValidationError = require("../Exception/validationError.ts");

describe("User class tests", () => {
    const myTestUser = new User();

    test("User class exists", () => {
        expect(myTestUser).toBeInstanceOf(User);
    });

    test("User can set and get IDs", () => {
        myTestUser.id = 15;
        expect(myTestUser.id).toBe(15);
    });

    test("User cannot set a username shorter than " + User.USERNAME_MIN_LENGTH + " characters", () => {
        expect(() => { myTestUser.username = "Ab" }).toThrow("Property \"username\" has to be at least " + User.USERNAME_MIN_LENGTH + " characters long");
        expect(() => { myTestUser.username = "Ab" }).toThrow(ValidationError);
    });

    test("User cannot set a username longer than " + User.USERNAME_MAX_LENGTH + " characters", () => {
        expect(() => { myTestUser.username = "AbcdefghiKLMNOPQRSTUV" }).toThrow("Property \"username\" cannot be longer than " + User.USERNAME_MAX_LENGTH + " characters long");
        expect(() => { myTestUser.username = "AbcdefghiKLMNOPQRSTUV" }).toThrow(ValidationError);
    });

    test("User cannot set a username with blank spaces", () => {
        expect(() => { myTestUser.username = "Abcdef ghiKLMNO" }).toThrow("Property \"username\" has to be letters and numbers only");
        expect(() => { myTestUser.username = "Abcdef ghiKLMNO" }).toThrow(ValidationError);
    });

    test("User cannot set a username with special characters", () => {
        expect(() => { myTestUser.username = "Abcdef&$%ghiKLMNO" }).toThrow("Property \"username\" has to be letters and numbers only");
        expect(() => { myTestUser.username = "Abcdef&$%ghiKLMNO" }).toThrow(ValidationError);
    });

    test("User cannot set a username with a number as a first letter", () => {
        expect(() => { myTestUser.username = "1Abcdef" }).toThrow("Property \"username\" has to start with a letter");
        expect(() => { myTestUser.username = "1Abcdef" }).toThrow(ValidationError);
    });

    test("User can set and get usernames", () => {
        myTestUser.username = "Foo";
        expect(myTestUser.username).toBe("Foo");
    });

    test("User can set and get usernames with numbers", () => {
        myTestUser.username = "Foo123";
        expect(myTestUser.username).toBe("Foo123");
    });

    test("User can set and get passwords", () => {
        myTestUser.password = "My Very Long Password Test With Numbers";
        expect(bcrypt.compareSync("My Very Long Password Test With Numbers", myTestUser.password)).toBe(true);
    });

    test("User can set and get first names", () => {
        myTestUser.firstName = "Lorem";
        expect(myTestUser.firstName).toBe("Lorem");
    });

    test("User can set and get last names", () => {
        myTestUser.lastName = "Ipsum";
        expect(myTestUser.lastName).toBe("Ipsum");
    });

    test("User can compute full names", () => {
        expect(myTestUser.computeFullName()).toBe("Lorem Ipsum");
    });
});