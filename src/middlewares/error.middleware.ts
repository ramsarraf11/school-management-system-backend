import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/response.util';

/**
 * Global error handler middleware
 * @param err - Error object
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error:', err); // Log the error for debugging
  handleError(res, err);
};