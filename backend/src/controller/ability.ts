import { Router, NextFunction } from "express";
import { Request, Response } from "express";
import { getAbilities } from "../services/ability";

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
  "/ability",
  asyncHandler(async (req: Request, res: Response) => {
    const values = await getAbilities();
    res.send(values);
  }),
);

export default router;
