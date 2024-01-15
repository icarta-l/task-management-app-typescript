const User = require("../Entity/user.js");
const PostgreSQLDatabase = require("../Database/PostgreSQLDatabase.js");
const RepositoryDatabaseError = require("Exception/RepositoryDatabaseError.js");
import {DatabaseError} from "pg-protocol";

import type { Repository } from "./Repository.js";
import type { UserInterface } from "../Entity/UserInterface.js";
import type { Entity } from "../Entity/Entity.js";
import type { QueryResult } from "pg";

module.exports = class UserRepository implements Repository {
    private databaseConnection: DatabaseInterface;
    private reasonForFailure: string = "";

    constructor()
    {
        this.databaseConnection = PostgreSQLDatabase.getInstance();
    }

    public async connect(host: string, user: string, password: string, port: number, database_name: string): Promise<void>
    {
        await this.databaseConnection.connect(host, user, password, port, database_name);
    }

    public async getAll(): Promise<UserInterface[]|boolean>
    {
        const result: QueryResult = await this.databaseConnection.query("SELECT * FROM app_users");

        if (result.rowCount !== null && result.rowCount > 0) {
            return this.hydrateRows(result);
        } else {
            return false;
        }
    }

    public async get(id: number): Promise<UserInterface|boolean>
    {
        const result: QueryResult = await this.databaseConnection.query("SELECT * FROM app_users WHERE id = $1", [id]);

        if (result.rowCount !== null && result.rowCount > 0) {
            return this.hydrateRow(new User(), result.rows[0]);
        } else {
            return false;
        }
    }

    public async update(user: UserInterface): Promise<boolean>
    {
        const result: QueryResult = await this.databaseConnection.query("UPDATE app_users SET first_name = $1, last_name = $2 WHERE id = $3", [user.firstName, user.lastName, user.id]);

        if (result.rowCount !== null && result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    }

    delete(entity: Entity): boolean;

    private hydrateRow(user: UserInterface, userData: UserQueryResult): UserInterface
    {
        user.username = userData.username;
        user.password = userData.password;
        user.firstName = userData.first_name;
        user.lastName = userData.last_name;
        user.email = userData.email;
        user.id = userData.id;

        return user;
    }

    private hydrateRows(result: QueryResult): UserInterface[]
    {
        const users: UserInterface[] = [];

        for (let i: number = 0; i < result.rows.length; i++) {
            users.push(this.hydrateRow(new User(), result.rows[i]));
        }

        return users;
    }

    private handleDatabaseError(error: DatabaseError): void
    {
        switch (error.constraint) {
            case "app_users_email_key":
                throw new RepositoryDatabaseError("This email is already registered with another user");
                break;
            
            case "app_users_username_key":
                throw new RepositoryDatabaseError("This username is already registered with another user");
                break;

            default:
                throw error;
        }
    }

    private handleErrors(error: any): void
    {
        if (error instanceof DatabaseError) {
            this.handleDatabaseError(error);
        } else {
            throw error;
        }
    }

    private async attemptUserRegistration(user: UserInterface): Promise<QueryResult|undefined>
    {
        try {
            return await this.databaseConnection.query(
                "INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [user.firstName, user.lastName, user.password, user.username, user.email]
            ); 
        } catch (error: any) {
            this.handleErrors(error);
        }
    }

    private userHasEmail(user: UserInterface): boolean
    {
        if (typeof user.email === "string" && user.email.length > 0) {
            return true;
        } else {
            this.reasonForFailure = "A user needs to be associated with an email address to be registered";

            return false;
        }
    }

    private userHasUsername(user: UserInterface): boolean
    {
        if (typeof user.username === "string" && user.username.length > 0) {
            return true;
        } else {
            this.reasonForFailure = "A user needs to be associated with a username to be registered";

            return false;
        }
    }

    private userHasPassword(user: UserInterface): boolean
    {
        if (typeof user.password === "string" && user.password.length > 0) {
            return true;
        } else {
            this.reasonForFailure = "A user needs to be associated with a password to be registered";

            return false;
        }
    }

    public getReasonForFailure(): string
    {
        return this.reasonForFailure;
    }

    public userIsValid(user: UserInterface): boolean
    {
        if (this.userHasEmail(user) && 
        this.userHasUsername(user) &&
        this.userHasPassword(user)) {
            return true;
        } else {
            return false;
        }
    }

    public async create(user: UserInterface): Promise<false|UserInterface>
    {
        let result: QueryResult|undefined = await this.attemptUserRegistration(user);

        if (typeof result === "object" && result.rowCount !== null && result.rowCount > 0) {
            return this.hydrateRow(new User(), result.rows[0]);
        } else {
            return false;
        }
    }

    public async close(): Promise<void>
    {
        await this.databaseConnection.close();
    }
}