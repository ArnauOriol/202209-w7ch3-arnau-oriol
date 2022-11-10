import type { Request } from "express";

export interface UserStructure {
  username: string;
  password: string;
  email: string;
}

export interface UserTokenPayload {
  id: string;
  username: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
