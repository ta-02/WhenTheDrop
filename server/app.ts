import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoute";
import { problemRoutes } from "./routes/problemsRoute";
import path from "path";

export const app = express();

const middleWare = [
  cookieParser(),
  bodyParser.json(),
  express.static(path.join(__dirname, "../frontend/dist")),
];
const routes = [authRoutes, problemRoutes];

middleWare.forEach((m) => app.use(m));
routes.forEach((r) => app.use("/api", r));

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});
