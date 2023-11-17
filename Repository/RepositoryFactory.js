"use strict";
module.exports = class RepositoryFactory {
    getRepository(classname) {
        switch (classname) {
            case "User":
                return new UserRepository();
                break;
            default:
                return false;
        }
    }
};
