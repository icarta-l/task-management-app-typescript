import {beforeAll, describe, expect, test} from '@jest/globals';
import express, { Express, Response } from 'express';

const request = require("supertest");

let app: any;

beforeAll(() => {
  app = request(require("./app"));
});

describe("POST", () => {
  test("should return a 201 HTTP response", async() => {
    const response = await app.post("/register")
      .send({
        username: "User Test",
        password: "my test password",
        firstName: "Lorem",
        lastName: "Ipsum"
      })
      .expect(201);
  })
});