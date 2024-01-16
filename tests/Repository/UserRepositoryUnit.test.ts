import {jest, afterAll, describe, expect, test} from "@jest/globals";
import type {UserInterface} from "../../Entity/UserInterface.js";

require("dotenv").config({ path: ".env.test" });

const bcrypt = require("bcrypt");
const UserRepository = require("Repository/UserRepository.js");
const PostgreSQLDatabase = require("Database/PostgreSQLDatabase.js");
const User = require("Entity/User.js");
const RepositoryDatabaseError = require("Exception/RepositoryDatabaseError.js");
const ValidationError = require("Exception/ValidationError.js");

const userRepository: typeof UserRepository = new UserRepository();

afterAll(async () => {
    const postgreSQLDatabase = PostgreSQLDatabase.getInstance();
    await postgreSQLDatabase.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
    await postgreSQLDatabase.query("TRUNCATE TABLE app_users, project_members, team_members, user_tasks");
    await postgreSQLDatabase.close();
});

describe("UserRepository class tests", () => {

    test("Connection to PostgreSQL Database uses PostgreSQLDatabase application class", async () => {
        const spy = jest.spyOn(PostgreSQLDatabase.getInstance(), "connect");
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Disconnection to PostgreSQL Database uses PostgreSQLDatabase application class", async () => {
        const spy = jest.spyOn(PostgreSQLDatabase.getInstance(), "close");
        await userRepository.close();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("UserRepository can create users", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username";
        user.email = "test@gmail.com";

        const registeredUser: UserInterface = await userRepository.create(user);

        expect(registeredUser).toBeInstanceOf(User);
        expect(registeredUser.id).toBeGreaterThan(0);
        expect(registeredUser.firstName).toBe(user.firstName);
        expect(registeredUser.lastName).toBe(user.lastName);
        expect(bcrypt.compareSync("amazingly Cunning Password 2!", registeredUser.password)).toBe(true);
        expect(registeredUser.password).toBe(user.password);
        expect(registeredUser.username).toBe(user.username);
        expect(registeredUser.email).toBe(user.email);

        await userRepository.close();
    });

    test("UserRepository cannot create two users with the same email", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username";
        user.email = "test@gmail.com";

        await expect(userRepository.create(user)).rejects.toThrow("This email is already registered with another user");
        await expect(userRepository.create(user)).rejects.toThrow(RepositoryDatabaseError);
        

        await userRepository.close();
    });

    test("UserRepository cannot create two users with the same username", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username";
        user.email = "test2@gmail.com";

        await expect(userRepository.create(user)).rejects.toThrow("This username is already registered with another user");
        await expect(userRepository.create(user)).rejects.toThrow(RepositoryDatabaseError);
        
        await userRepository.close();
    });

    test("UserRepository can spot users without email", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username2";

        expect(userRepository.userIsValid(user)).toBe(false);
        expect(userRepository.getReasonForFailure()).toBe("A user needs to be associated with an email address to be registered");
        
        await userRepository.close();
    });

    test("UserRepository can spot users without username", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.email = "test2@gmail.com";

        expect(userRepository.userIsValid(user)).toBe(false);
        expect(userRepository.getReasonForFailure()).toBe("A user needs to be associated with a username to be registered");
        
        await userRepository.close();
    });

    test("UserRepository can spot users without password", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        user.username = "username2";
        user.email = "test2@gmail.com";

        expect(userRepository.userIsValid(user)).toBe(false);
        expect(userRepository.getReasonForFailure()).toBe("A user needs to be associated with a password to be registered");
        
        await userRepository.close();
    });

    test("UserRepository can retrieve all users", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username2";
        user.email = "test3@gmail.com";

        const newUser = await userRepository.create(user);

        const user2 = new User();

        user2.firstName = "Foo";
        user2.lastName = "Bar";
        const password2: string|false = user2.processAndHashPassword("amazingly Cunning Password 2!");
        if (password2) {
            user2.password = password2;
        }
        user2.username = "username3";
        user2.email = "test4@gmail.com";

        const newUser2 = await userRepository.create(user2);

        const results = await userRepository.getAll();

        expect(results).toEqual(expect.arrayContaining([newUser, newUser2]));
        
        await userRepository.close();
    });

    test("UserRepository returns false when trying to retrieve all users when database is empty", async () => {        
        const postgreSQLDatabase = PostgreSQLDatabase.getInstance();

        await postgreSQLDatabase.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        await postgreSQLDatabase.query("TRUNCATE TABLE app_users, project_members, team_members, user_tasks");
        await postgreSQLDatabase.close();

        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);

        const results = await userRepository.getAll();

        expect(results).toBe(false);
        
        await userRepository.close();
    });

    test("UserRepository can retrieve one specific user by id", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username4";
        user.email = "test5@gmail.com";

        const newUser = await userRepository.create(user);

        const retrievedUser = await userRepository.get(newUser.id);

        expect(retrievedUser).toEqual(newUser);
        
        await userRepository.close();
    });

    test("UserRepository returns false when trying to retrieve a non-existing user by id", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);

        const retrievedUser = await userRepository.get(1);

        expect(retrievedUser).toEqual(false);
        
        await userRepository.close();
    });

    test("UserRepository can update user", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username7";
        user.email = "test8@gmail.com";

        const registeredUser: UserInterface = await userRepository.create(user);

        registeredUser.firstName = "Dofus";

        const result = await userRepository.update(registeredUser);

        expect(result).toBe(true);
        expect(registeredUser.id).toBeGreaterThan(0);
        expect(registeredUser.firstName).toBe("Dofus");
        expect(registeredUser.lastName).toBe(user.lastName);
        expect(bcrypt.compareSync("amazingly Cunning Password 2!", registeredUser.password)).toBe(true);
        expect(registeredUser.password).toBe(user.password);
        expect(registeredUser.username).toBe(user.username);
        expect(registeredUser.email).toBe(user.email);
    });

    test("UserRepository returns false when trying to update a non-existing user by id", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username8";
        user.email = "test9@gmail.com";

        const registeredUser: UserInterface = await userRepository.create(user);

        registeredUser.id = 1;

        const result = await userRepository.update(registeredUser);

        expect(result).toBe(false);
    });

    test("UserRepository can delete user", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username9";
        user.email = "test10@gmail.com";

        const registeredUser: UserInterface = await userRepository.create(user);

        const deletionResult = await userRepository.delete(registeredUser);

        const retrievalResult = await userRepository.get(registeredUser.id);

        expect(deletionResult).toBe(true);
        expect(retrievalResult).toBe(false);
    });

    test("UserRepository returns false when trying to delete a non-existing user", async () => {
        await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
        const user = new User();

        user.firstName = "Foo";
        user.lastName = "Bar";
        const password: string|false = user.processAndHashPassword("amazingly Cunning Password 2!");
        if (password) {
            user.password = password;
        }
        user.username = "username10";
        user.email = "test11@gmail.com";

        const registeredUser: UserInterface = await userRepository.create(user);

        registeredUser.id = 1;

        const result = await userRepository.delete(registeredUser);

        expect(result).toBe(false);
    });
});