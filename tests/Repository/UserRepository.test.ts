import {jest, describe, expect, test} from '@jest/globals';
import type {Repository} from "../../Repository/Repository.js";

require('dotenv').config({ path: '/custom/path/to/.env' });

const UserRepository = require("Repository/UserRepository.js");
const PostgreSQLDatabase = require("Database/PostgreSQLDatabase.js");

const userRepository = new UserRepository();
jest.mock("Database/PostgreSQLDatabase.js");

describe("UserRepository class tests", () => {

    test("Connection to PostgreSQL Database from .env.test variable doesn't throw errors", async () => {
        userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        expect(PostgreSQLDatabase).toHaveBeenCalledTimes(1);
    });

    test("Disconnection to PostgreSQL Database from .env.test variable doesn't throw errors", async () => {
        userRepository.close();
        expect(PostgreSQLDatabase).toHaveBeenCalledTimes(1);
    });
});