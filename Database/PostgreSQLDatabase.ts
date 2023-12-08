const Client = require("pg").Client;

module.exports = class PostgreSQLDatabase implements DatabaseInterface {
    private postgreSQLclient: typeof Client|null = null;
    private static instance: PostgreSQLDatabase|null = null;
    private isConnected: boolean = false;

    public static getInstance(): PostgreSQLDatabase 
    {
        if (PostgreSQLDatabase.instance === null) {
            PostgreSQLDatabase.instance = new PostgreSQLDatabase();
        }

        return PostgreSQLDatabase.instance;
    }

    public async connect(host: string, user: string, password: string, port: number, database_name: string): Promise<void> 
    {
        if (this.isConnected === false) {
            this.postgreSQLclient = new Client({
                user: user,
                host: host,
                database: database_name,
                password: password,
                port: port
            });
            await this.postgreSQLclient.connect();
            this.isConnected = true;
        }
    }

    public async query(query: string, values?: Array<any>): Promise<any>
    {
        return await this.postgreSQLclient.query(query, values);
    }
    
    public async close(): Promise<void>
    {
        if (this.isConnected === true) {
            await this.postgreSQLclient.end();
            this.isConnected = false;
        }
    }
}