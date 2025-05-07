import { Router, NextFunction } from "express";
import { Request, Response } from "express";
import { getTypes } from "../services/pokemon-type";

const router = Router();

type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

const asyncHandler =
  (fn: RouteHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

router.get(
  "/type",
  asyncHandler(async (_: Request, res: Response) => {
    const values = await getTypes();
    res.send(values);
  }),
);

export default router;
