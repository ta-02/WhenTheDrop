import { Router, Response } from "express";
import { Request } from "../types";
import { problems } from "../problems";

export const problemRoutes = Router();

problemRoutes.get("/problems", (req: Request, res: Response) => {
  res.json(problems);
});
