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

    test("User cannot set a password shorter than " + User.PASSWORD_MIN_LENGTH + " characters", () => {
        expect(() => { myTestUser.password = "1Abcdef" }).toThrow("Property \"password\" has to be at least " + User.PASSWORD_MIN_LENGTH + " characters long");
        expect(() => { myTestUser.password = "1Abcdef" }).toThrow(ValidationError);
    });

    test("User cannot set a password longer than " + User.PASSWORD_MAX_LENGTH + " characters", () => {
        expect(() => { myTestUser.password = "1Abcdef sxdfs df sdf sdf sdfsdfsdfsdfsdf sd fsd sd fsdfsdfsdfsdf asdfsdfsdf asdf" }).toThrow("Property \"password\" cannot be longer than " + User.PASSWORD_MAX_LENGTH + " characters long");
        expect(() => { myTestUser.password = "1Abcdef sxdfs df sdf sdf sdfsdfsdfsdfsdf sd fsd sd fsdfsdfsdfsdf asdfsdfsdf asdf" }).toThrow(ValidationError);
    });

    test("User cannot set a password without at least " + User.PASSWORD_MIN_NUMBER_OF_CAPITALISED_LETTERS + " capitalised letters", () => {
        expect(() => { myTestUser.password = "my very long password test with numbers1" }).toThrow("Property \"password\" has to contain at least " + User.PASSWORD_MIN_NUMBER_OF_CAPITALISED_LETTERS + " capitalised letters");
        expect(() => { myTestUser.password = "my very long password test with numbers1" }).toThrow(ValidationError);
    });

    test("User cannot set a password without at least " + User.PASSWORD_MIN_NUMBER_OF_LETTERS + " letters", () => {
        expect(() => { myTestUser.password = "ad123 4654 444888" }).toThrow("Property \"password\" has to contain at least " + User.PASSWORD_MIN_NUMBER_OF_LETTERS + " letters");
        expect(() => { myTestUser.password = "ad123 4654 444888" }).toThrow(ValidationError);
    });

    test("User cannot set a password without at least " + User.PASSWORD_MIN_NUMBER_OF_NUMBERS + " numbers", () => {
        expect(() => { myTestUser.password = "adsdfs sdfsdfsdfsd sdf" }).toThrow("Property \"password\" has to contain at least " + User.PASSWORD_MIN_NUMBER_OF_NUMBERS + " numbers");
        expect(() => { myTestUser.password = "adsdfs sdfsdfsdfsd sdf" }).toThrow(ValidationError);
    });

    test("User cannot set a password without at least " + User.PASSWORD_MIN_NUMBER_OF_SPECIAL_CHARACTERS + " special characters", () => {
        expect(() => { myTestUser.password = "adsdf1ssdfsdfsdfsdsdF" }).toThrow("Property \"password\" has to contain at least " + User.PASSWORD_MIN_NUMBER_OF_SPECIAL_CHARACTERS + " special characters");
        expect(() => { myTestUser.password = "adsdf1ssdfsdfsdfsdsdF" }).toThrow(ValidationError);
    });

    test("User can set and get passwords", () => {
        myTestUser.password = "My Very Long Password Test With Numbers1&";
        expect(bcrypt.compareSync("My Very Long Password Test With Numbers1&", myTestUser.password)).toBe(true);
    });

    test("User cannot set firstnames without at least " + User.NAMES_MIN_LENGTH + " letters", () => {
        expect(() => { myTestUser.firstName = "ab" }).toThrow("Property \"firstName\" has to be at least " + User.NAMES_MIN_LENGTH + " characters long");
        expect(() => { myTestUser.firstName = "ab" }).toThrow(ValidationError);
    });

    test("User cannot set firstnames with more than " + User.NAMES_MAX_LENGTH + " letters", () => {
        expect(() => { myTestUser.firstName = "asdfasdfasdfasdffsdfasdfòasdlfkjsaòdlfksajdòflksadfsdlfkasdòf" }).toThrow("Property \"firstName\" cannot be longer than " + User.NAMES_MAX_LENGTH + " characters long");
        expect(() => { myTestUser.firstName = "asdfasdfasdfasdffsdfasdfòasdlfkjsaòdlfksajdòflksadfsdlfkasdòf" }).toThrow(ValidationError);
    });

    test("User cannot set firstnames with numbers", () => {
        expect(() => { myTestUser.firstName = "abv2" }).toThrow("Property \"firstName\" has to be letters only");
        expect(() => { myTestUser.firstName = "abv2" }).toThrow(ValidationError);
    });

    test("User can set and get firstnames", () => {
        myTestUser.firstName = "Lorem";
        expect(myTestUser.firstName).toBe("Lorem");
    });

    test("User cannot set lastnames without at least " + User.NAMES_MIN_LENGTH + " letters", () => {
        expect(() => { myTestUser.lastName = "ab" }).toThrow("Property \"lastName\" has to be at least " + User.NAMES_MIN_LENGTH + " characters long");
        expect(() => { myTestUser.lastName = "ab" }).toThrow(ValidationError);
    });

    test("User cannot set lastnames with more than " + User.NAMES_MAX_LENGTH + " letters", () => {
        expect(() => { myTestUser.lastName = "asdfasdfasdfasdffsdfasdfòasdlfkjsaòdlfksajdòflksadfsdlfkasdòf" }).toThrow("Property \"lastName\" cannot be longer than " + User.NAMES_MAX_LENGTH + " characters long");
        expect(() => { myTestUser.lastName = "asdfasdfasdfasdffsdfasdfòasdlfkjsaòdlfksajdòflksadfsdlfkasdòf" }).toThrow(ValidationError);
    });

    test("User cannot set lastnames with numbers", () => {
        expect(() => { myTestUser.lastName = "abv2" }).toThrow("Property \"lastName\" has to be letters only");
        expect(() => { myTestUser.lastName = "abv2" }).toThrow(ValidationError);
    });

    test("User can set and get last names", () => {
        myTestUser.lastName = "Ipsum";
        expect(myTestUser.lastName).toBe("Ipsum");
    });

    test("User can compute full names", () => {
        expect(myTestUser.computeFullName()).toBe("Lorem Ipsum");
    });

    test("User cannot set email with wrong format", () => {
        expect(() => { myTestUser.email = "abc-@mail.com" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc-@mail.com" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = "abc..def@mail.com" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc..def@mail.com" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = ".abc@mail.com" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = ".abc@mail.com" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = "abc#def@mail.com" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc#def@mail.com" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = "abc.def@mail.c" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc.def@mail.c" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = "abc.def@mail#archive.com" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc.def@mail#archive.com" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = "abc.def@mail" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc.def@mail" }).toThrow(ValidationError);

        expect(() => { myTestUser.email = "abc.def@mail..com" }).toThrow("Property \"email\" doesn't have a valid email format");
        expect(() => { myTestUser.email = "abc.def@mail..com" }).toThrow(ValidationError);
    });

    test("User can set and get email", () => {
        myTestUser.email = "test@email.com";
        expect(myTestUser.email).toBe("test@email.com");
    });
});