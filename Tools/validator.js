"use strict";
var _a;
const ValidationError = require("../Exception/validationError.js");
module.exports = (_a = class Validator {
        stringIsLongEnough(stringToCheck, length, propertyName) {
            if (stringToCheck.length < length) {
                throw new ValidationError("Property \"" + propertyName + "\" has to be at least " + length + " characters long");
            }
            return true;
        }
        stringIsShortEnough(stringToCheck, length, propertyName) {
            if (stringToCheck.length > length) {
                throw new ValidationError("Property \"" + propertyName + "\" cannot be longer than " + length + " characters long");
            }
            return true;
        }
        stringHasOnlyLetters(stringToCheck, propertyName) {
            const regex = /^[a-zA-Z]+$/gm;
            if (stringToCheck.match(regex) === null) {
                throw new ValidationError("Property \"" + propertyName + "\" has to be letters only");
            }
            return true;
        }
        stringHasOnlyLettersAndNumbers(stringToCheck, propertyName) {
            const regex = /^[a-zA-Z0-9]+$/gm;
            if (stringToCheck.match(regex) === null) {
                throw new ValidationError("Property \"" + propertyName + "\" has to be letters and numbers only");
            }
            return true;
        }
        stringStartsWithALetter(stringToCheck, propertyName) {
            const regex = /^[a-zA-Z]+/gm;
            if (stringToCheck.match(regex) === null) {
                throw new ValidationError("Property \"" + propertyName + "\" has to start with a letter");
            }
            return true;
        }
        stringHasAtLeastNLetters(stringToCheck, numberOfLetters, propertyName) {
            const regex = /[a-zA-Z]{1}/gm;
            const matches = stringToCheck.match(regex);
            if (matches === null || matches.length < numberOfLetters) {
                throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfLetters + " letters");
            }
            return true;
        }
        stringHasAtLeastNNumbers(stringToCheck, numberOfNumbers, propertyName) {
            const regex = /[0-9]{1}/gm;
            const matches = stringToCheck.match(regex);
            if (matches === null || matches.length < numberOfNumbers) {
                throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfNumbers + " numbers");
            }
            return true;
        }
        stringHasAtLeastNCapitalisedLetters(stringToCheck, numberOfCapitalisedLetters, propertyName) {
            const regex = /[A-Z]{1}/gm;
            const matches = stringToCheck.match(regex);
            if (matches === null || matches.length < numberOfCapitalisedLetters) {
                throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfCapitalisedLetters + " capitalised letters");
            }
            return true;
        }
        stringHasAtLeastNSpecialCharacters(stringToCheck, numberOfSpecialCharacter, propertyName) {
            const matches = stringToCheck.match(Validator.AUTHORIZED_SPECIAL_CHARACTERS);
            if (matches === null || matches.length < numberOfSpecialCharacter) {
                throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfSpecialCharacter + " special characters");
            }
            return true;
        }
        stringIsEmail(stringToCheck, propertyName) {
            const matches = stringToCheck.match(Validator.EMAIL_FORMAT);
            if (matches === null) {
                throw new ValidationError("Property \"" + propertyName + "\" doesn't have a valid email format");
            }
            return true;
        }
        validateString(stringToCheck, options, propertyName) {
            for (const [key, value] of Object.entries(options)) {
                switch (key) {
                    case "stringIsLongEnough":
                        this.stringIsLongEnough(stringToCheck, value.length, propertyName);
                        break;
                    case "stringIsShortEnough":
                        this.stringIsShortEnough(stringToCheck, value.length, propertyName);
                        break;
                    case "stringHasOnlyLetters":
                        this.stringHasOnlyLetters(stringToCheck, propertyName);
                    case "stringHasOnlyLettersAndNumbers":
                        this.stringHasOnlyLettersAndNumbers(stringToCheck, propertyName);
                        break;
                    case "stringStartsWithALetter":
                        this.stringStartsWithALetter(stringToCheck, propertyName);
                        break;
                    case "stringHasAtLeastNLetters":
                        this.stringHasAtLeastNLetters(stringToCheck, value.numberOfLetters, propertyName);
                        break;
                    case "stringHasAtLeastNNumbers":
                        this.stringHasAtLeastNNumbers(stringToCheck, value.numberOfNumbers, propertyName);
                        break;
                    case "stringHasAtLeastNCapitalisedLetters":
                        this.stringHasAtLeastNCapitalisedLetters(stringToCheck, value.numberOfCapitalisedLetters, propertyName);
                        break;
                    case "stringHasAtLeastNSpecialCharacters":
                        this.stringHasAtLeastNSpecialCharacters(stringToCheck, value.numberOfSpecialCharacter, propertyName);
                        break;
                    case "stringIsEmail":
                        this.stringIsEmail(stringToCheck, propertyName);
                        break;
                }
            }
            return true;
        }
    },
    _a.AUTHORIZED_SPECIAL_CHARACTERS = /[~`!@#$%^&*()_\-+={\[}\]\|\\:;\"'<,>.?\/\ ]/gm,
    _a.EMAIL_FORMAT = /^[a-z0-9]+(?:[\.]{1}(?=[a-z]+))?(?:[\-]{1}(?=[a-z]+))?(?:[_]{1}(?=[a-z]+))?[a-z0-9]*@[a-z0-9]+(?:[\-]{1}(?=[a-z]+))?[a-z]*[\.]{1}[a-z0-9]{2,}$/gm,
    _a);
