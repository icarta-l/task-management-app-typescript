import express, { Express, Router } from 'express';

const app: Express = express();
const port: number = 3000;
const userRouter: Router = require("./Router/user.js");

app.use("/", userRouter);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports.App = app;
module.exports.Server = server;