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
const RepositoryDatabaseError = require("../Exception/RepositoryDatabaseError.js");
const ValidationError = require("../Exception/ValidationError.js");
const UserRepository = require("../Repository/UserRepository.js");
class UserController {
    handleRequest(request, response) {
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
    handleErrors(error, response) {
        if (error instanceof RepositoryDatabaseError || error instanceof ValidationError) {
            response.status(error.code).send(error.message);
        }
        else {
            response.status(500).send("We're sorry but an unknown error has occured");
        }
    }
    processAction(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.handleRequest(request, response);
            }
            catch (error) {
                this.handleErrors(error, response);
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
    handleRegistration(userRepository, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser;
            if (userRepository.userIsValid(user)) {
                newUser = yield userRepository.create(user);
            }
            else {
                throw new ValidationError(userRepository.getReasonForFailure());
            }
            return newUser;
        });
    }
    registerUserInDatabase(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield new RepositoryFactory().getRepository("User");
            const newUser = yield this.handleRegistration(userRepository, user);
            yield userRepository.close();
            return newUser;
        });
    }
    handleInsertionResponse(result, response) {
        if (result instanceof User) {
            response.status(201).send("POST request to \"register\" route");
        }
        else {
            response.status(422).send("For some reasons we couldn't register the new user. Try modifying the submitted user information and submit again");
        }
    }
    insertUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User();
            this.getUserPropertyFromRequest(user, request);
            const result = yield this.registerUserInDatabase(user);
            this.handleInsertionResponse(result, response);
        });
    }
}
module.exports = new UserController();
