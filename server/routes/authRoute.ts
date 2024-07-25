import { Router, Response } from "express";
import { Request } from "../types";
import { kindeClient, sessionManager, getUser } from "../auth/kindeAuth";

export const authRoutes = Router();

authRoutes.get("/login", async (req: Request, res: Response) => {
  const loginUrl = await kindeClient.login(sessionManager(req, res));
  return res.redirect(loginUrl.toString());
});

authRoutes.get("/register", async (req: Request, res: Response) => {
  const registerUrl = await kindeClient.register(sessionManager(req, res));
  return res.redirect(registerUrl.toString());
});

authRoutes.get("/callback", async (req: Request, res: Response) => {
  const url = new URL(`${req.protocol}://${req.get("host")}${req.url}`);
  await kindeClient.handleRedirectToApp(sessionManager(req, res), url);
  return res.redirect("/");
});

authRoutes.get("/logout", async (req: Request, res: Response) => {
  const logoutUrl = await kindeClient.logout(sessionManager(req, res));
  return res.redirect(logoutUrl.toString());
});

authRoutes.get("/me", getUser, async (req: Request, res: Response) => {
  const user = req.user;
  res.json({ user });
});
