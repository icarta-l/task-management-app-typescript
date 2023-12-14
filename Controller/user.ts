import type { Request, Response } from 'express';
import type { Controller } from "./Controller.js";
import type { Repository } from "../Repository/Repository.js";
import type { UserInterface } from "../Entity/UserInterface.js";

const User = require("../Entity/user.js");
const RepositoryFactory = require("../Repository/RepositoryFactory.js");

class UserController implements Controller {

    public async processAction(request: Request, response: Response): Promise<void>
    {
        switch (request.route.path.replace("/", "")) {
            case "register":
                await this.insertUser(request, response);
                break;

            default:
                response.status(404);
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

    private async registerUserInDatabase(user: UserInterface): Promise<void>
    {
        const userRepository: Repository = await new RepositoryFactory().getRepository("User");
        await userRepository.create(user);
        await userRepository.close();
    }

    private async insertUser(request: Request, response: Response): Promise<void>
    {
        const user: UserInterface = new User();

        this.getUserPropertyFromRequest(user, request);
        await this.registerUserInDatabase(user);

        response.status(201).send("POST request to \"register\" route");
    }
}

module.exports = new UserController();