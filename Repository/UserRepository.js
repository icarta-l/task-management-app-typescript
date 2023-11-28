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
const User = require("../Entity/user.js");
const PostgreSQLDatabase = require("../Database/PostgreSQLDatabase.js");
module.exports = class UserRepository {
    constructor() {
        this.databaseConnection = PostgreSQLDatabase.getInstance();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.databaseConnection.query("SELECT * FROM app_users");
        });
    }
    hydrateRow(userData) {
        console.log("Here inside:", userData);
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Here!");
            const result = yield this.databaseConnection.query("INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *", [user.firstName, user.lastName, user.password, user.username, user.email]);
            console.log("There!");
            return this.hydrateRow(result);
        });
    }
};
