interface DatabaseInterface {
    connect(host: string, user: string, password: string, port: number, database_name: string): void;
    getRows(query: string): Promise<object[]>;
}