import request from "supertest";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDatabase from "../../database";
import User from "../../database/models/User";
import app from "../app";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the usersRouter router with POST and /login endpoint", () => {
  describe("When it receives a request with username: 'Nose' and password: '1234' on its body", () => {
    test("Then it should respond with status 200 and a token", async () => {
      await User.create({
        username: "Nose",
        password: await bcrypt.hash("1234", 10),
        email: "nose@gmail.com",
      });
      const expectedStatus = 200;
      const requestBody = {
        username: "Nose",
        password: "1234",
      };

      const res = await request(app)
        .post("/users/login")
        .send(requestBody)
        .expect(expectedStatus);

      expect(res.body).toHaveProperty("accesstoken");
    });
  });
});
