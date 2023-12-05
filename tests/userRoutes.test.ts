import {beforeAll, afterAll, describe, expect, test} from '@jest/globals';
import "dotenv/config";

const PostgreSQLDatabase = require("../Database/PostgreSQLDatabase.js");

const request = require("supertest");

let app: any;
let server: any;

beforeAll(() => {
  app = request(require("../app").App);
  server = require("../app").Server;
});

afterAll(async () => {
  app = null;
  server.close();
  const postgreSQLDatabase = PostgreSQLDatabase.getInstance();
  await postgreSQLDatabase.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
  await postgreSQLDatabase.query("TRUNCATE TABLE app_users, project_members, team_members, user_tasks");
  await postgreSQLDatabase.close();
})

describe("POST to register route", () => {
  test("should return a 201 HTTP response", async() => {
    const response = await app.post("/register")
      .send({
        username: "UserTest",
        email: "test@gmail.com",
        password: "my Test password1",
        firstName: "Lorem",
        lastName: "Ipsum"
      })
      .set('Accept', 'application/json');
      expect(response.status).toEqual(201);
  })
});