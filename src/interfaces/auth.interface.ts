import { Request } from "express";
import { User } from "./user.interface";

export interface DataStoredInToken {
  staff_id: string;
}

export interface TokenData {
  token: string;
  //expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}