module.exports = class RepositoryDatabaseError extends Error {
    public name: string = "RepositoryDatabaseError";
    public code: number = 409;

    constructor(...params: any[]) {
        super(...params);
    }
}