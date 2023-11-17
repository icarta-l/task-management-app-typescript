"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const jsonParser = body_parser_1.default.json();
app.post("/register", jsonParser, (request, response) => {
    console.log(request.body.Id);
    //response.send('welcome, ' + request.body);
    response.send("POST request to \"register\" route");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports = app;
