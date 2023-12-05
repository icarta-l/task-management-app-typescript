import {describe, expect, test} from '@jest/globals';

const RepositoryFactory = require("../Repository/RepositoryFactory.js");
const UserRepository = require("../Repository/UserRepository.js");

describe("RepositoryFactory class tests", () => {
    const myTestRepositoryFactory = new RepositoryFactory();

    test("RepositoryFactory can return UserRepository", async () => {
        const userRepository = await myTestRepositoryFactory.getRepository("User");
        expect(userRepository).toBeInstanceOf(UserRepository);
        await userRepository.close();
    });

    test("Unrecognised repository returns false", async () => {
        expect(await myTestRepositoryFactory.getRepository("Foo Bar")).toBe(false);
    })
});

