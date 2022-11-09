import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError";
import User from "../../database/models/User";
import { mockUser } from "../../mocks/mockUser";
import loginUser from "./usersControllers";

describe("Given the userLogin function", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with the username 'Paco' that is not registered", () => {
    test("Then it should call the next function with a custom error", async () => {
      const req: Partial<Request> = {
        body: {
          username: "Paco",
          password: "3321",
        },
      };
      const customError = new CustomError(
        "Username not found",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with the username 'Nose' and the incorrect password '4321'", () => {
    test("Then it should call the next function with a custom error", async () => {
      const req: Partial<Request> = {
        body: {
          username: "Nose",
          password: "4321",
        },
      };

      User.findOne = jest.fn().mockReturnValue(mockUser);

      await loginUser(req as Request, res as Response, next as NextFunction);
    });
  });

  describe("When it receives a request with the username 'Nose' and the correct password '1234'", () => {
    test("Then the response should call its method status with '200'", async () => {
      const req: Partial<Request> = {
        body: {
          username: "Nose",
          password: "1234",
        },
      };
      const expectedStatus = 200;

      User.findOne = jest.fn().mockReturnValue(mockUser);

      await loginUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the response should call its method json with the new token", async () => {
      const req: Partial<Request> = {
        body: {
          username: "Nose",
          password: "1234",
        },
      };
      const expectedToken = {
        accesstoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmMxZjg3ZmViNzA1NjQxY2MxN2Q0ZiIsInVzZXJuYW1lIjoiTm9zZSIsImlhdCI6MTY2ODAzMDgyMn0.xA9e1T4mymj2w-IdlJXTuKXnGLzoFVW3wsAPvSpJjPM",
      };

      User.findOne = jest.fn().mockReturnValue(mockUser);

      await loginUser(req as Request, res as Response, null);

      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });
});
