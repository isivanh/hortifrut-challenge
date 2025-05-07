import { Request, Response, NextFunction } from 'express';
import type { ErrorRequestHandler } from 'express';
import { ApiError } from './error';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({message: err.message});
  }

  res.status(500).json({message: 'An unexpected error occurred'});
};
