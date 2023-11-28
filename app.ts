import express, { Express, Request, Response } from 'express';
import bodyParser, {BodyParser} from 'body-parser';
import { NextHandleFunction } from "connect";
import "dotenv/config";

const app: Express = express();
const port: number = 3000;
const jsonParser: NextHandleFunction = bodyParser.json();

const User = require("./Entity/user.js");
const RepositoryFactory = require("./Repository/RepositoryFactory.js");

app.post("/register", jsonParser, (request: Request, response: Response) => {
    console.log(request.body.Id);
    //response.send('welcome, ' + request.body);
    const user = new User();

    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    user.password = user.processAndHashPassword(request.body.password);
    user.username = request.body.username;
    user.email = request.body.email;

    const userRepository = new RepositoryFactory().getRepository("User");
    userRepository.create(user);

    response.status(201).send("POST request to \"register\" route");
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports.App = app;
module.exports.Server = server;