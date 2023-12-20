module.exports = class ValidationError extends Error {
    public name: string = "ValidationError";
    public code: number = 409;

    constructor(...params: any[]) {
        super(...params);
    }
}