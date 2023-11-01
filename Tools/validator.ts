const ValidationError = require("../Exception/validationError.ts");

interface ValidatorInterface {
    stringIsLongEnough(stringToCheck: string, length: number, propertyName: string): boolean;
    stringIsShortEnough(stringToCheck: string, length: number, propertyName: string): boolean;
    stringHasOnlyLetters(stringToCheck: string, propertyName: string): boolean;
    stringHasOnlyLettersAndNumbers(stringToCheck: string, propertyName: string): boolean;
    stringStartsWithALetter(stringToCheck: string, propertyName: string): boolean;
    stringHasAtLeastNLetters(stringToCheck: string, numberOfLetters: number, propertyName: string): boolean;
    stringHasAtLeastNNumbers(stringToCheck: string, numberOfNumbers: number, propertyName: string): boolean;
    stringHasAtLeastNCapitalisedLetters(stringToCheck: string, numberOfCapitalisedLetters: number, propertyName: string): boolean;
    validateString(stringToCheck: string, options: object, propertyName: string): boolean;
}

module.exports = class Validator implements ValidatorInterface {
    static AUTHORIZED_SPECIAL_CHARACTERS: RegExp = /[~`!@#$%^&*()_\-+={\[}\]\|\\:;\"'<,>.?\/\ ]/gm;
    static EMAIL_FORMAT: RegExp = /^[a-z0-9]+(?:[\.]{1}(?=[a-z]+))?(?:[\-]{1}(?=[a-z]+))?(?:[_]{1}(?=[a-z]+))?[a-z0-9]*@[a-z0-9]+(?:[\-]{1}(?=[a-z]+))?[a-z]*[\.]{1}[a-z0-9]{2,}$/gm
    
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

    public stringHasAtLeastNLetters(stringToCheck: string, numberOfLetters: number, propertyName: string): boolean 
    {
        const regex = /[a-zA-Z]{1}/gm;
        const matches: string[] | null = stringToCheck.match(regex);
        if (matches === null || matches.length < numberOfLetters) {
            throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfLetters + " letters");
        }

        return true;
    }

    public stringHasAtLeastNNumbers(stringToCheck: string, numberOfNumbers: number, propertyName: string): boolean 
    {
        const regex = /[0-9]{1}/gm;
        const matches: string[] | null = stringToCheck.match(regex);
        if (matches === null || matches.length < numberOfNumbers) {
            throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfNumbers + " numbers");
        }

        return true;
    }

    public stringHasAtLeastNCapitalisedLetters(stringToCheck: string, numberOfCapitalisedLetters: number, propertyName: string): boolean 
    {
        const regex = /[A-Z]{1}/gm;
        const matches: string[] | null = stringToCheck.match(regex);
        if (matches === null || matches.length < numberOfCapitalisedLetters) {
            throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfCapitalisedLetters + " capitalised letters");
        }

        return true;
    }

    public stringHasAtLeastNSpecialCharacters(stringToCheck: string, numberOfSpecialCharacter: number, propertyName: string): boolean
    {   
        const matches: string[] | null = stringToCheck.match(Validator.AUTHORIZED_SPECIAL_CHARACTERS);
        if (matches === null || matches.length < numberOfSpecialCharacter) {
            throw new ValidationError("Property \"" + propertyName + "\" has to contain at least " + numberOfSpecialCharacter + " special characters");
        }
        return true;
    }

    public stringIsEmail(stringToCheck: string, propertyName: string): boolean
    {
        const matches: string[] | null = stringToCheck.match(Validator.EMAIL_FORMAT);
        if (matches === null) {
            throw new ValidationError("Property \"" + propertyName + "\" doesn't have a valid email format");
        }
        return true;
    }

    public validateString(stringToCheck: string, options: object, propertyName: string): boolean 
    {
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
}