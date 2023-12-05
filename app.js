"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const userRouter = require("./Router/user.js");
app.use("/", userRouter);
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports.App = app;
module.exports.Server = server;
