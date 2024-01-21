import {jest, afterAll, describe, expect, test} from "@jest/globals";
import type { Request, Response } from 'express';
import express from 'express';

require("dotenv").config({ path: ".env.test" });

const UserController = require("Controller/User.js");

const mockResponse = {
    json: jest.fn(),
    status: jest.fn(() => mockResponse),
    send: jest.fn()
} as unknown as Response;

const PostgreSQLDatabase = require("Database/PostgreSQLDatabase.js");

afterAll(async () => {
    const postgreSQLDatabase = PostgreSQLDatabase.getInstance();
    await postgreSQLDatabase.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
    await postgreSQLDatabase.query("TRUNCATE TABLE app_users, project_members, team_members, user_tasks");
    await postgreSQLDatabase.close();
});

describe("UserController class tests", () => {
    test("UserController can process user register request", async () => {
        const mockRequest = {
            body: {
                firstName: "Foo",
                lastName: "Bar",
                password: "amazingly Cunning Password 2!",
                username: "username",
                email: "test@gmail.com"
            },
            route: {
                path: "/register"
            }
        } as Request;

        await UserController.processAction(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalledWith("User successfully registered");
    });

    test("UserController send HTTP code 409 when trying to create two users with the same email", async () => {
        const mockRequest = {
            body: {
                firstName: "Foo",
                lastName: "Bar",
                password: "amazingly Cunning Password 2!",
                username: "username",
                email: "test@gmail.com"
            },
            route: {
                path: "/register"
            }
        } as Request;
        
        await UserController.processAction(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.send).toHaveBeenCalledWith("This email is already registered with another user");
    });

    test("UserController send HTTP code 409 when trying to create two users with the same username", async () => {
        const mockRequest = {
            body: {
                firstName: "Foo",
                lastName: "Bar",
                password: "amazingly Cunning Password 2!",
                username: "username",
                email: "test2@gmail.com"
            },
            route: {
                path: "/register"
            }
        } as Request;
        
        await UserController.processAction(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.send).toHaveBeenCalledWith("This username is already registered with another user");
    });

    test("UserController send error when trying to create a user with incorrect firstName property", async () => {
        const mockRequest = {
            body: {
                firstName: "Fo",
                lastName: "Bar",
                password: "amazingly Cunning Password 2!",
                username: "username",
                email: "test2@gmail.com"
            },
            route: {
                path: "/register"
            }
        } as Request;
        
        await UserController.processAction(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.send).toHaveBeenCalledWith("Property \"firstName\" has to be at least 3 characters long");

        const mockRequest2 = {
            body: {
                firstName: "Fosdfasdfsdfsadfsdfsdfsdsdfsdfsdfsfsdfasdfasdfsdfasdfasdfsadfsdffsadfsdf",
                lastName: "Bar",
                password: "amazingly Cunning Password 2!",
                username: "username",
                email: "test2@gmail.com"
            },
            route: {
                path: "/register"
            }
        } as Request;
        
        await UserController.processAction(mockRequest2, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.send).toHaveBeenCalledWith("Property \"firstName\" cannot be longer than 50 characters long");

        const mockRequest3 = {
            body: {
                firstName: "Fosdfasdfsdfsadfsdf sdfsdsdfsdfsdfsf",
                lastName: "Bar",
                password: "amazingly Cunning Password 2!",
                username: "username",
                email: "test2@gmail.com"
            },
            route: {
                path: "/register"
            }
        } as Request;
        
        await UserController.processAction(mockRequest3, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.send).toHaveBeenCalledWith("Property \"firstName\" has to be letters only");
    });
});