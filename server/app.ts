import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import authRoutes from "./authRoute";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", authRoutes);

app.use("/", (req: Request, res: Response) => {
  return res.json("Hello World");
});

export default app;
