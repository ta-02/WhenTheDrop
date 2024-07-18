import { UserType } from "@kinde-oss/kinde-typescript-sdk";
import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  user?: UserType;
}
