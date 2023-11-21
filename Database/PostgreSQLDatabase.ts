const Client = require("pg").Client;
require("dotenv/config");

module.exports = class PostgreSQLDatabase implements DatabaseInterface {
    private postgreSQLclient: Client|null = null;
    private static instance: PostgreSQLDatabase|null = null;

    public static getInstance(): PostgreSQLDatabase 
    {
        if (PostgreSQLDatabase.instance === null) {
            PostgreSQLDatabase.instance = new PostgreSQLDatabase();
        }

        return PostgreSQLDatabase.instance;
    }

    public connect(host: string|undefined, user: string|undefined, password: string|undefined, port: number|undefined, database_name: string|undefined): void 
    {
        this.postgreSQLclient = new Client({
            user: user,
            host: host,
            database: database_name,
            password: password,
            port: port
        });
    }

    public async query(query: string): Promise<any>
    {
        return await this.postgreSQLclient.query(query);
    }
}