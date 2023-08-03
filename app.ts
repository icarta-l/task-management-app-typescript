import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.post("/register", (request: Request, response: Response) => {
    response.send("POST request to \"register\" route");
})

module.exports = app;