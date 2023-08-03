"use strict";
const bcrypt = require('bcrypt');
module.exports = class User {
    constructor() {
        this._id = 0;
        this._username = "";
        this._password = "";
        this._firstName = "";
        this._lastName = "";
        this._saltRound = 10;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get username() {
        return this._username;
    }
    set username(username) {
        this._username = username;
    }
    get password() {
        return this._password;
    }
    set password(password) {
        this._password = this.hashPassword(password);
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, this._saltRound);
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        this._firstName = firstName;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }
    computeFullName() {
        return this.firstName + " " + this.lastName;
    }
};
