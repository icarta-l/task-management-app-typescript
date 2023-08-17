module.exports = class ValidationError extends Error {
    public name: string = "ValidationError";

    constructor(...params: any[]) {
        super(...params);
    }
}