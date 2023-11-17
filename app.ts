import express, { Express, Request, Response } from 'express';
import bodyParser, {BodyParser} from 'body-parser';
import { NextHandleFunction } from "connect";

const app: Express = express();
const port: number = 3000;
const jsonParser: NextHandleFunction = bodyParser.json();

app.post("/register", jsonParser, (request: Request, response: Response) => {
    console.log(request.body.Id);
    //response.send('welcome, ' + request.body);
    response.send("POST request to \"register\" route");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = app;