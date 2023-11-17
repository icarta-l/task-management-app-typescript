import {Client} from "pg";

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

    public connect(host: string, user: string, password: string, port: number, database_name: string): void 
    {
        this.postgreSQLclient = new Client({
            user: 'dbuser',
            host: 'database.server.com',
            database: 'mydb',
            password: 'secretpassword',
            port: 3211,
          });
    }

    public async getRows(query: string): Promise<object[]>
    {

    }
}