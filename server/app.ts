import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoute";
import { problemRoutes } from "./routes/problemsRoute";
import path from "path";

const app = express();

const middleWare = [
  cookieParser(),
  bodyParser.json(),
  express.static(path.join(__dirname, "../frontend/dist")),
];
middleWare.forEach((m) => app.use(m));

app.use("/api", authRoutes);
app.use("/api", problemRoutes);

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

export default app;
