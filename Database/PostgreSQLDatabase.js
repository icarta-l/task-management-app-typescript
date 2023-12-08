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
var _a;
const Client = require("pg").Client;
module.exports = (_a = class PostgreSQLDatabase {
        constructor() {
            this.postgreSQLclient = null;
            this.isConnected = false;
        }
        static getInstance() {
            if (PostgreSQLDatabase.instance === null) {
                PostgreSQLDatabase.instance = new PostgreSQLDatabase();
            }
            return PostgreSQLDatabase.instance;
        }
        connect(host, user, password, port, database_name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.isConnected === false) {
                    this.postgreSQLclient = new Client({
                        user: user,
                        host: host,
                        database: database_name,
                        password: password,
                        port: port
                    });
                    yield this.postgreSQLclient.connect();
                    this.isConnected = true;
                }
            });
        }
        query(query, values) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.postgreSQLclient.query(query, values);
            });
        }
        close() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.isConnected === true) {
                    yield this.postgreSQLclient.end();
                    this.isConnected = false;
                }
            });
        }
    },
    _a.instance = null,
    _a);
