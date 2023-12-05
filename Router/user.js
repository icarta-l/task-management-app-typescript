"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const router = require("express-promise-router")();
const jsonParser = body_parser_1.default.json();
const userController = require("../Controller/user.js");
router.post("/register", jsonParser, (request, response) => {
    userController.processAction(request, response);
});
module.exports = router;
