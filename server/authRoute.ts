import { Router, Response } from "express";
import { Request } from "./types";
import { kindeClient, sessionManager, getUser } from "./kindAuth";

const authRoutes = Router();

authRoutes.use("/login", async (req: Request, res: Response) => {
  const loginUrl = await kindeClient.login(sessionManager(req, res));
  return res.redirect(loginUrl.toString());
});

authRoutes.use("/register", async (req: Request, res: Response) => {
  const registerUrl = await kindeClient.register(sessionManager(req, res));
  return res.redirect(registerUrl.toString());
});

authRoutes.use("/callback", async (req: Request, res: Response) => {
  const url = new URL(`${req.protocol}://${req.get("host")}${req.url}`);
  await kindeClient.handleRedirectToApp(sessionManager(req, res), url);
  return res.redirect("/");
});

authRoutes.use("/logout", async (req: Request, res: Response) => {
  const logoutUrl = await kindeClient.logout(sessionManager(req, res));
  return res.redirect(logoutUrl.toString());
});

authRoutes.use("/me", getUser, async (req: Request, res: Response) => {
  const user = req.user;
  res.json({ user });
});

export default authRoutes;
