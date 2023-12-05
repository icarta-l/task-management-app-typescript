import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { NextHandleFunction } from "connect";
import type { Controller } from "../Controller/Controller.js";

const router: Router = require("express-promise-router")();
const jsonParser: NextHandleFunction = bodyParser.json();

const userController: Controller = require("../Controller/user.js");

router.post("/register", jsonParser, (request: Request, response: Response) => {
    userController.processAction(request, response);
});

module.exports = router;