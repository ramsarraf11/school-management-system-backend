import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ResponseHandler } from '../utils/response.handler';

export const validationResultHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg).join(', ');
    return ResponseHandler.failure(req, res, 'Validation Error', 400, new Error(messages));
  }
  next();
};
