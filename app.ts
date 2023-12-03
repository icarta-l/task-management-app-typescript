import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { NextHandleFunction } from "connect";

const app: Express = express();
const port: number = 3000;
const jsonParser: NextHandleFunction = bodyParser.json();

const User = require("./Entity/user.js");
const RepositoryFactory = require("./Repository/RepositoryFactory.js");

app.post("/register", jsonParser, async (request: Request, response: Response) => {
    const user: UserInterface = new User();

    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    const password = user.processAndHashPassword(request.body.password);
    if (password) {
        user.password = password;
    }
    user.username = request.body.username;
    user.email = request.body.email;

    const userRepository: Repository = await new RepositoryFactory().getRepository("User");
    await userRepository.create(user);
    await userRepository.close();

    response.status(201).send("POST request to \"register\" route");
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports.App = app;
module.exports.Server = server;