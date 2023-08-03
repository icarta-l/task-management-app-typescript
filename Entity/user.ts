const bcrypt = require('bcrypt');

interface UserInterface extends Entity {
    get username(): string;
    set username(username: string);
    get password(): string;
    set password(password: string);
    get firstName(): string;
    set firstName(firstName: string);
    get lastName(): string;
    set lastName(lastName: string);
    computeFullName(): string;
}

module.exports = class User implements UserInterface {
    private _id: number = 0;
    private _username: string = "";
    private _password: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    
    private _saltRound: number = 10;

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
        // TODO: Implement username check. Must be at least 6 characters long and
        //       be composed exclusively of letters and numbers with a maximum of 25
        //       characters.
        this._username = username;
    }

    public get password(): string
    {
        return this._password;
    }

    public set password(password: string)
    {
        // TODO: Implement password check. Must be at least 10 characters long and
        //       be composed of at least 3 letters, 1 number and 1 special character.
        this._password = this.hashPassword(password);
    }

    private hashPassword(password: string): string
    {
        return bcrypt.hashSync(password, this._saltRound)
    }

    public get firstName(): string
    {
        return this._firstName;
    }

    public set firstName(firstName: string)
    {
        // TODO: Implement first name check. Must be at least 3 characters long and
        //       be composed exclusively of letters.
        this._firstName = firstName;
    }

    public get lastName(): string
    {
        return this._lastName;
    }

    public set lastName(lastName: string)
    {
        // TODO: Implement first name check. Must be at least 3 characters long and
        //       be composed exclusively of letters.
        this._lastName = lastName;
    }

    public computeFullName(): string
    {
        return this.firstName + " " + this.lastName;
    }
}