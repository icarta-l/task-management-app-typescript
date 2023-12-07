import {jest} from '@jest/globals';
const Client = require("pg").Client;

module.exports = class PostgreSQLDatabase implements DatabaseInterface {
    private postgreSQLclient: typeof Client|null = null;
    private static instance: PostgreSQLDatabase|null = null;

    public static getInstance(): PostgreSQLDatabase 
    {
        if (PostgreSQLDatabase.instance === null) {
            PostgreSQLDatabase.instance = new PostgreSQLDatabase();
        }

        return PostgreSQLDatabase.instance;
    }

    public async connect(host: string, user: string, password: string, port: number, database_name: string): Promise<void> 
    {
        this.postgreSQLclient = new Client({
            user: user,
            host: host,
            database: database_name,
            password: password,
            port: port
        });
        await this.postgreSQLclient.connect();
    }

    public async query(query: string, values?: Array<any>): Promise<any>
    {
        return await this.postgreSQLclient.query(query, values);
    }
    
    public async close(): Promise<void>
    {
        this.postgreSQLclient.end();
    }
}