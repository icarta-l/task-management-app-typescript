const Client = require("pg").Client;

module.exports = class PostgreSQLDatabase implements DatabaseInterface {
    private postgreSQLclient: typeof Client|null = null;
    private static instance: PostgreSQLDatabase|null = null;

    public static getInstance(): PostgreSQLDatabase 
    {
        if (PostgreSQLDatabase.instance === null) {
            PostgreSQLDatabase.instance = new PostgreSQLDatabase();
            PostgreSQLDatabase.instance.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
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
        this.postgreSQLclient.connect();
    }

    public async query(query: string, values: Array<any>|null = null): Promise<any>
    {
        return await this.postgreSQLclient.query(query, values);
    }
}