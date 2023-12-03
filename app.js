"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const jsonParser = body_parser_1.default.json();
const User = require("./Entity/user.js");
const RepositoryFactory = require("./Repository/RepositoryFactory.js");
app.post("/register", jsonParser, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User();
    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    const password = user.processAndHashPassword(request.body.password);
    if (password) {
        user.password = password;
    }
    user.username = request.body.username;
    user.email = request.body.email;
    const userRepository = yield new RepositoryFactory().getRepository("User");
    yield userRepository.create(user);
    yield userRepository.close();
    response.status(201).send("POST request to \"register\" route");
}));
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports.App = app;
module.exports.Server = server;
