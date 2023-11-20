import {Client} from "pg";
import "dotenv/config"

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
            user: process.env.POSTGRESQL_USER,
            host: process.env.POSTGRESQL_HOST,
            database: process.env.POSTGRESQL_DATABASE,
            password: process.env.POSTGRESQL_PASSWORD,
            port: Number(process.env.POSTGRESQL_PORT)
        });
    }

    public async getRows(query: string): Promise<object[]>
    {

    }
}