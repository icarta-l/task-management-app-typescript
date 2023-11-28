"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3000;
const jsonParser = body_parser_1.default.json();
const User = require("./Entity/user.js");
const RepositoryFactory = require("./Repository/RepositoryFactory.js");
app.post("/register", jsonParser, (request, response) => {
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
    response.send("POST request to \"register\" route");
});
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports.App = app;
module.exports.Server = server;
