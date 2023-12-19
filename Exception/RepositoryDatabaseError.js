"use strict";
module.exports = class RepositoryDatabaseError extends Error {
    constructor(...params) {
        super(...params);
        this.name = "RepositoryDatabaseError";
    }
};
