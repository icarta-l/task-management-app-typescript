module.exports = class RepositoryDatabaseError extends Error {
    public name: string = "RepositoryDatabaseError";

    constructor(...params: any[]) {
        super(...params);
    }
}