import {beforeAll, describe, expect, test} from '@jest/globals';
const Validator = require("./validator.ts");

describe("Validator class tests", () => {
    const myTestValidator = new Validator();

    test("Validator class exists", () => {
        expect(myTestValidator).toBeInstanceOf(Validator);
    });

    test("Validator can check string is long enough", () => {
        expect(myTestValidator.stringIsLongEnough("Abc", 3, "name")).toBe(true);
    });

    test("Validator can check string is short enough", () => {
        expect(myTestValidator.stringIsShortEnough("Abcdefghijklmopq", 16, "name")).toBe(true);
    });
});