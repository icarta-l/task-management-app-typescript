interface DatabaseInterface {
    connect(host: string, user: string, password: string, port: number, database_name: string): void;
    query(query: string, values?: Array<any>): Promise<any>;
    close(): Promise<void>;
}