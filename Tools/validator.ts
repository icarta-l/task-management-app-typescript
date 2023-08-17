const ValidationError = require("../Exception/validationError.ts");

interface ValidatorInterface {
    stringIsLongEnough(stringToCheck: string, length: number, propertyName: string): boolean;
    stringIsShortEnough(stringToCheck: string, length: number, propertyName: string): boolean;
    stringHasOnlyLetters(stringToCheck: string, propertyName: string): boolean;
    stringHasOnlyLettersAndNumbers(stringToCheck: string, propertyName: string): boolean;
    stringStartsWithALetter(stringToCheck: string, propertyName: string): boolean;
}

module.exports = class Validator implements ValidatorInterface {
    static AUTHORIZED_SPECIAL_CHARACTERS: RegExp = /~`!@#$%^&*()_\-+={\[}\]\|\\:;\"'<,>.?\/\ /gm;
    
    public stringIsLongEnough(stringToCheck: string, length: number, propertyName: string): boolean 
    {
        if (stringToCheck.length < length) {
            throw new ValidationError("Property \"" + propertyName + "\" has to be at least " + length + " characters long");
        }

        return true;
    }

    public stringIsShortEnough(stringToCheck: string, length: number, propertyName: string): boolean 
    {
        if (stringToCheck.length > length) {
            throw new ValidationError("Property \"" + propertyName + "\" cannot be longer than " + length + " characters long");
        }

        return true;
    }

    public stringHasOnlyLetters(stringToCheck: string, propertyName: string): boolean
    {
        const regex = /^[a-zA-Z]+$/gm;

        if (stringToCheck.match(regex) === null) {
            throw new ValidationError("Property \"" + propertyName + "\" has to be letters only");
        }

        return true;
    }

    public stringHasOnlyLettersAndNumbers(stringToCheck: string, propertyName: string): boolean 
    {
        const regex = /^[a-zA-Z0-9]+$/gm;

        if (stringToCheck.match(regex) === null) {
            throw new ValidationError("Property \"" + propertyName + "\" has to be letters and numbers only");
        }

        return true;
    }

    public stringStartsWithALetter(stringToCheck: string, propertyName: string): boolean 
    {
        const regex = /^[a-zA-Z]+/gm;

        if (stringToCheck.match(regex) === null) {
            throw new ValidationError("Property \"" + propertyName + "\" has to start with a letter");
        }

        return true;
    }
}