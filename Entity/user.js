"use strict";
var _a;
const bcrypt = require('bcrypt');
const Validator = require("../Tools/validator.js");
module.exports = (_a = class User {
        constructor() {
            this._id = 0;
            this._username = "";
            this._password = "";
            this._firstName = "";
            this._lastName = "";
            this._email = "";
            this._saltRound = 10;
            this._validator = new Validator();
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
            if (this.usernameIsValid(username)) {
                this._username = username;
            }
        }
        getUsernameValidationOptions() {
            return {
                stringIsLongEnough: {
                    length: User.USERNAME_MIN_LENGTH
                },
                stringIsShortEnough: {
                    length: User.USERNAME_MAX_LENGTH
                },
                stringHasOnlyLettersAndNumbers: {},
                stringStartsWithALetter: {}
            };
        }
        usernameIsValid(username) {
            if (this._validator.validateString(username, this.getUsernameValidationOptions(), "username")) {
                return true;
            }
            else {
                return false;
            }
        }
        get password() {
            return this._password;
        }
        set password(password) {
            if (this.passwordIsValid(password)) {
                this._password = this.hashPassword(password);
            }
        }
        getPasswordValidationOptions() {
            return {
                stringIsLongEnough: {
                    length: User.PASSWORD_MIN_LENGTH
                },
                stringIsShortEnough: {
                    length: User.PASSWORD_MAX_LENGTH
                },
                stringHasAtLeastNLetters: {
                    numberOfLetters: User.PASSWORD_MIN_NUMBER_OF_LETTERS
                },
                stringHasAtLeastNNumbers: {
                    numberOfNumbers: User.PASSWORD_MIN_NUMBER_OF_NUMBERS
                },
                stringHasAtLeastNCapitalisedLetters: {
                    numberOfCapitalisedLetters: User.PASSWORD_MIN_NUMBER_OF_CAPITALISED_LETTERS
                },
                stringHasAtLeastNSpecialCharacters: {
                    numberOfSpecialCharacter: User.PASSWORD_MIN_NUMBER_OF_SPECIAL_CHARACTERS
                }
            };
        }
        passwordIsValid(password) {
            if (this._validator.validateString(password, this.getPasswordValidationOptions(), "password")) {
                return true;
            }
            else {
                return false;
            }
        }
        hashPassword(password) {
            return bcrypt.hashSync(password, this._saltRound);
        }
        get firstName() {
            return this._firstName;
        }
        set firstName(firstName) {
            if (this.nameIsValid(firstName, "firstName")) {
                this._firstName = firstName;
            }
        }
        get lastName() {
            return this._lastName;
        }
        set lastName(lastName) {
            if (this.nameIsValid(lastName, "lastName")) {
                this._lastName = lastName;
            }
        }
        getNamesValidationOptions() {
            return {
                stringIsLongEnough: {
                    length: User.NAMES_MIN_LENGTH
                },
                stringIsShortEnough: {
                    length: User.NAMES_MAX_LENGTH
                },
                stringHasOnlyLetters: {}
            };
        }
        nameIsValid(name, propertyName) {
            if (this._validator.validateString(name, this.getNamesValidationOptions(), propertyName)) {
                return true;
            }
            else {
                return false;
            }
        }
        computeFullName() {
            return this.firstName + " " + this.lastName;
        }
        get email() {
            return this._email;
        }
        set email(email) {
            if (this.emailIsValid(email)) {
                this._email = email;
            }
        }
        emailIsValid(email) {
            if (this._validator.validateString(email, { stringIsEmail: {} }, "email")) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    _a.USERNAME_MIN_LENGTH = 3,
    _a.USERNAME_MAX_LENGTH = 20,
    _a.PASSWORD_MIN_LENGTH = 10,
    _a.PASSWORD_MAX_LENGTH = 55,
    _a.PASSWORD_MIN_NUMBER_OF_CAPITALISED_LETTERS = 1,
    _a.PASSWORD_MIN_NUMBER_OF_LETTERS = 3,
    _a.PASSWORD_MIN_NUMBER_OF_NUMBERS = 1,
    _a.PASSWORD_MIN_NUMBER_OF_SPECIAL_CHARACTERS = 1,
    _a.NAMES_MIN_LENGTH = 3,
    _a.NAMES_MAX_LENGTH = 50,
    _a);
