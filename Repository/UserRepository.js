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
module.exports = class UserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.databaseConnection.query("SELECT * FROM app_users");
        });
    }
    hydrateRow(userData) {
        console.log(userData);
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.databaseConnection.query("INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *");
            return this.hydrateRow(result);
        });
    }
};
