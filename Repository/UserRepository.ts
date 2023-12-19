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

    constructor()
    {
        this.databaseConnection = PostgreSQLDatabase.getInstance();
    }

    public async connect(host: string, user: string, password: string, port: number, database_name: string): Promise<void>
    {
        await this.databaseConnection.connect(host, user, password, port, database_name);
    }

    public async getAll(): Promise<UserInterface[]>
    {
        return await this.databaseConnection.query("SELECT * FROM app_users");
    }
    get(id: number): Entity;
    update(entity: Entity): boolean;
    delete(entity: Entity): boolean;

    private hydrateRow(user: UserInterface, result: QueryResult): UserInterface
    {
        const userData: UserQueryResult = result.rows[0];

        user.username = userData.username;
        user.password = userData.password;
        user.firstName = userData.first_name;
        user.lastName = userData.last_name;
        user.email = userData.email;
        user.id = userData.id;

        return user;
    }

    private handleDatabaseError(error: DatabaseError): void
    {
        switch (error.constraint) {
            case "app_users_email_key":
                throw new RepositoryDatabaseError("This email is already registered with another user");
                break;
        }
    }

    public async create(user: UserInterface): Promise<false | UserInterface>
    {
        let result: QueryResult|undefined;
        try {
            result = await this.databaseConnection.query(
                "INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [user.firstName, user.lastName, user.password, user.username, user.email]
                ); 
        } catch (error: any) {
            if (error instanceof DatabaseError) {
                this.handleDatabaseError(error);
            }
        }
        if (typeof result === "object") {
            return this.hydrateRow(new User(), result);
        } else {
            return false;
        }
    }

    public async close(): Promise<void>
    {
        await this.databaseConnection.close();
    }
}