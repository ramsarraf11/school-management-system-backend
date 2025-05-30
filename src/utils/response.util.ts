import { Response } from 'express';

/**
 * Handle success responses
 * @param res - Express Response object
 * @param message - Success message
 * @param data - Optional data to include in the response
 */
export const handleSuccess = (res: Response, message: string, data: any = null) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

/**
 * Handle failure responses
 * @param res - Express Response object
 * @param message - Failure message
 * @param statusCode - HTTP status code (default: 400)
 */
export const handleFailure = (res: Response, message: string, statusCode: number = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Handle error responses
 * @param res - Express Response object
 * @param error - Error object or message
 * @param statusCode - HTTP status code (default: 500)
 */
export const handleError = (res: Response, error: any, statusCode: number = 500) => {
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    error: error.stack || error,
  });
};