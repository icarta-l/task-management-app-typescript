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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../Entity/User.js");
const RepositoryFactory = require("../Repository/RepositoryFactory.js");
class UserController {
    processAction(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (request.route.path.replace("/", "")) {
                case "register":
                    yield this.insertUser(request, response);
                    break;
                default:
                    response.status(404);
            }
        });
    }
    getUserPropertyFromRequest(user, request) {
        user.firstName = request.body.firstName;
        user.lastName = request.body.lastName;
        const password = user.processAndHashPassword(request.body.password);
        if (password) {
            user.password = password;
        }
        user.username = request.body.username;
        user.email = request.body.email;
    }
    registerUserInDatabase(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield new RepositoryFactory().getRepository("User");
            yield userRepository.create(user);
            yield userRepository.close();
        });
    }
    insertUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User();
            this.getUserPropertyFromRequest(user, request);
            yield this.registerUserInDatabase(user);
            response.status(201).send("POST request to \"register\" route");
        });
    }
}
module.exports = new UserController();
