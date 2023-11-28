const bcrypt = require('bcrypt');
const Validator = require("../Tools/validator.js");

interface UserInterface extends Entity {
    get username(): string;
    set username(username: string);
    get password(): string;
    set password(password: string);
    get firstName(): string;
    set firstName(firstName: string);
    get lastName(): string;
    set lastName(lastName: string);
    get email(): string;
    set email(email: string);
    computeFullName(): string;
    processAndHashPassword(password: string): string|false;
}

module.exports = class User implements UserInterface {
    static USERNAME_MIN_LENGTH: number = 3;
    static USERNAME_MAX_LENGTH: number = 20;

    static PASSWORD_MIN_LENGTH: number = 10;
    static PASSWORD_MAX_LENGTH: number = 55;
    static PASSWORD_MIN_NUMBER_OF_CAPITALISED_LETTERS: number = 1;
    static PASSWORD_MIN_NUMBER_OF_LETTERS: number = 3;
    static PASSWORD_MIN_NUMBER_OF_NUMBERS: number = 1;
    static PASSWORD_MIN_NUMBER_OF_SPECIAL_CHARACTERS: number = 1;

    static NAMES_MIN_LENGTH: number = 3;
    static NAMES_MAX_LENGTH: number = 50;

    private _id: number = 0;
    private _username: string = "";
    private _password: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _email: string = "";
    
    private _saltRound: number = 10;
    private _validator: ValidatorInterface = new Validator();

    public get id(): number
    {
        return this._id;
    }

    public set id(id: number)
    {
        this._id = id;
    }

    public get username(): string
    {
        return this._username;
    }

    public set username(username: string)
    {
        if (this.usernameIsValid(username)) {
            this._username = username;
        }
    }

    protected getUsernameValidationOptions(): object
    {
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

    protected usernameIsValid(username: string): boolean
    {
        if (this._validator.validateString(username, this.getUsernameValidationOptions(), "username")) {
            return true;
        } else {
            return false;
        }
    }

    public get password(): string
    {
        return this._password;
    }

    public set password(password: string)
    {
        this._password = password;
    }

    public processAndHashPassword(password: string): string|false
    {
        if (this.passwordIsValid(password)) {
            return this.hashPassword(password);
        } else {
            return false;
        }
    }

    protected getPasswordValidationOptions(): object
    {
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

    protected passwordIsValid(password: string): boolean
    {
        if (this._validator.validateString(password, this.getPasswordValidationOptions(), "password")) {
            return true;
        } else {
            return false;
        }
    }

    protected hashPassword(password: string): string
    {
        return bcrypt.hashSync(password, this._saltRound)
    }

    public get firstName(): string
    {
        return this._firstName;
    }

    public set firstName(firstName: string)
    {
        if (this.nameIsValid(firstName, "firstName")) {
            this._firstName = firstName;
        }
    }

    public get lastName(): string
    {
        return this._lastName;
    }

    public set lastName(lastName: string)
    {
        if (this.nameIsValid(lastName, "lastName")) {
            this._lastName = lastName;
        }
    }

    protected getNamesValidationOptions(): object
    {
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

    protected nameIsValid(name: string, propertyName: string): boolean
    {
        if (this._validator.validateString(name, this.getNamesValidationOptions(), propertyName)) {
            return true;
        } else {
            return false;
        }
    }

    public computeFullName(): string
    {
        return this.firstName + " " + this.lastName;
    }

    public get email(): string
    {
        return this._email;
    }

    public set email(email: string)
    {
        if (this.emailIsValid(email)) {
            this._email = email;
        }
    }

    protected emailIsValid(email: string): boolean
    {
        if (this._validator.validateString(email, {stringIsEmail: {}}, "email")) {
            return true;
        } else {
            return false;
        }
    }
}