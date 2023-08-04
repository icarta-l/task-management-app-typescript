import {beforeAll, describe, expect, test} from '@jest/globals';
const bcrypt = require('bcrypt');
const User = require("./user.ts");

describe("User class tests", () => {
    const myTestUser = new User();

    test("User class exists", () => {
        expect(myTestUser).toBeInstanceOf(User);
    });

    test("User can set and get IDs", () => {
        myTestUser.id = 15;
        expect(myTestUser.id).toBe(15);
    });

    test("User cannot set a username shorter than 3 characters", () => {
        expect(() => { myTestUser.username = "Ab" }).toThrow("Property \"username\" has to be at least 3 characters long");
    });

    test("User can set and get usernames", () => {
        myTestUser.username = "Foo";
        expect(myTestUser.username).toBe("Foo");
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