import type { Request, Response } from 'express';
import type { Controller } from "./Controller.js";
import type { UserInterface } from "../Entity/UserInterface.js";
import type { Entity } from "../Entity/Entity.js";

const User = require("../Entity/User.js");
const RepositoryFactory = require("../Repository/RepositoryFactory.js");
const RepositoryDatabaseError = require("../Exception/RepositoryDatabaseError.js");
const ValidationError = require("../Exception/ValidationError.js");
const UserRepository = require("../Repository/UserRepository.js");

class UserController implements Controller {

    private async handleRequest(request: Request, response: Response): Promise<void>
    {
        switch (request.route.path.replace("/", "")) {
            case "register":
                await this.insertUser(request, response);
                break;

            default:
                response.status(404);
        }
    }

    private handleErrors(error: any, response: Response): void
    {
        if (error instanceof RepositoryDatabaseError || error instanceof ValidationError) {
            response.status(error.code).send(error.message);
        } else {
            response.status(500).send("We're sorry but an unknown error has occured");
        }
    }

    public async processAction(request: Request, response: Response): Promise<void>
    {
        try {
            await this.handleRequest(request, response);
        } catch (error: any) {
            this.handleErrors(error, response);
        }
    }

    private getUserPropertyFromRequest(user: UserInterface, request: Request): void
    {
        user.firstName = request.body.firstName;
        user.lastName = request.body.lastName;
        const password: string|false = user.processAndHashPassword(request.body.password);
        if (password) {
            user.password = password;
        }
        user.username = request.body.username;
        user.email = request.body.email;
    }

    private async handleRegistration(userRepository: typeof UserRepository, user: Entity): Promise<Entity|false>
    {
        let newUser: Entity|false;

        if (userRepository.userIsValid(user)) {
            newUser = await userRepository.create(user);
        } else {
            throw new ValidationError(userRepository.getReasonForFailure());
        }

        return newUser;
    }

    private async registerUserInDatabase(user: UserInterface): Promise<Entity|false>
    {
        const userRepository: typeof UserRepository = await new RepositoryFactory().getRepository("User");
        const newUser: Entity|false = await this.handleRegistration(userRepository, user);

        await userRepository.close();

        return newUser;
    }

    private handleInsertionResponse(result: Entity|false, response: Response): void
    {
        if (result instanceof User) {
            response.status(201).send("POST request to \"register\" route");
        } else {
            response.status(422).send("For some reasons we couldn't register the new user. Try modifying the submitted user information and submit again");
        }
    }

    private async insertUser(request: Request, response: Response): Promise<void>
    {
        const user: UserInterface = new User();

        this.getUserPropertyFromRequest(user, request);
        const result: Entity|false = await this.registerUserInDatabase(user);
        this.handleInsertionResponse(result, response);
    }
}

module.exports = new UserController();