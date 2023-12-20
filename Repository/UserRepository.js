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
const User = require("../Entity/user.js");
const PostgreSQLDatabase = require("../Database/PostgreSQLDatabase.js");
const RepositoryDatabaseError = require("Exception/RepositoryDatabaseError.js");
const pg_protocol_1 = require("pg-protocol");
module.exports = class UserRepository {
    constructor() {
        this.reasonForFailure = "";
        this.databaseConnection = PostgreSQLDatabase.getInstance();
    }
    connect(host, user, password, port, database_name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.connect(host, user, password, port, database_name);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.databaseConnection.query("SELECT * FROM app_users");
        });
    }
    hydrateRow(user, result) {
        const userData = result.rows[0];
        user.username = userData.username;
        user.password = userData.password;
        user.firstName = userData.first_name;
        user.lastName = userData.last_name;
        user.email = userData.email;
        user.id = userData.id;
        return user;
    }
    handleDatabaseError(error) {
        switch (error.constraint) {
            case "app_users_email_key":
                throw new RepositoryDatabaseError("This email is already registered with another user");
                break;
            case "app_users_username_key":
                throw new RepositoryDatabaseError("This username is already registered with another user");
                break;
            default:
                throw error;
        }
    }
    handleErrors(error) {
        if (error instanceof pg_protocol_1.DatabaseError) {
            this.handleDatabaseError(error);
        }
        else {
            throw error;
        }
    }
    attemptUserRegistration(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.databaseConnection.query("INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *", [user.firstName, user.lastName, user.password, user.username, user.email]);
            }
            catch (error) {
                this.handleErrors(error);
            }
        });
    }
    userHasEmail(user) {
        if (typeof user.email === "string" && user.email.length > 0) {
            return true;
        }
        else {
            this.reasonForFailure = "A user needs to be associated with an email address to be registered";
            return false;
        }
    }
    getReasonForFailure() {
        return this.reasonForFailure;
    }
    userIsValid(user) {
        if (this.userHasEmail(user)) {
            return true;
        }
        else {
            return false;
        }
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.attemptUserRegistration(user);
            if (typeof result === "object") {
                return this.hydrateRow(new User(), result);
            }
            else {
                return false;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.close();
        });
    }
};
