import { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";

export const getPokemonFilterValidator = [
  query("type").optional(),
  query("ability").optional(),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("page_size")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Page size must be between 1 and 100"),
];

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({
    message: errors.array().map((error) => error.msg),
  });
};
