import { NextFunction, Response } from "express";
import { Request } from "../types";
import {
  createKindeServerClient,
  GrantType,
  SessionManager,
} from "@kinde-oss/kinde-typescript-sdk";
import "dotenv/config";
import z from "zod";

const KindeEnv = z.object({
  KINDE_DOMAIN: z.string(),
  KINDE_CLIENT_ID: z.string(),
  KINDE_CLIENT_SECRET: z.string(),
  KINDE_REDIRECT_URI: z.string().url(),
  KINDE_LOGOUT_REDIRECT_URI: z.string().url(),
});

const parsedEnv = KindeEnv.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

const {
  KINDE_DOMAIN,
  KINDE_CLIENT_ID,
  KINDE_CLIENT_SECRET,
  KINDE_REDIRECT_URI,
  KINDE_LOGOUT_REDIRECT_URI,
} = parsedEnv.data;

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: KINDE_DOMAIN,
    clientId: KINDE_CLIENT_ID,
    clientSecret: KINDE_CLIENT_SECRET,
    redirectURL: KINDE_REDIRECT_URI,
    logoutRedirectURL: KINDE_LOGOUT_REDIRECT_URI,
  },
);

export const sessionManager = (
  req: Request,
  res: Response,
): SessionManager => ({
  async getSessionItem(key: string) {
    const result = req.cookies[key];
    return result ? JSON.parse(result) : null;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    } as const;
    res.cookie(key, JSON.stringify(value), cookieOptions);
  },
  async removeSessionItem(key: string) {
    res.clearCookie(key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      res.clearCookie(key);
    });
  },
});

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const manager = sessionManager(req, res);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);
    if (!isAuthenticated) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await kindeClient.getUserProfile(manager);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
