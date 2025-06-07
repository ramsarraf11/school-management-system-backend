import express from 'express';
import { ApiError } from './api.error';
import { InputValidationError } from './input.validation';
import { Logger } from './logger';

export class ResponseHandler {
    /**
     * Handles failure responses
     * @param request - Express request object
     * @param response - Express response object
     * @param message - Error message
     * @param httpErrorCode - HTTP status code (default: 500)
     * @param error - Error object (optional)
     */
    public static failure(
        request: express.Request,
        response: express.Response,
        message: string = 'An error has occurred.',
        httpErrorCode: number = 500,
        error?: Error
    ) {
        const clientIps = request.ips.length > 0 ? request.ips : [request.header('x-forwarded-for') || request.socket.remoteAddress];

        const responseObject = {
            status: 'failure',
            message: error?.message || message,
            httpCode: httpErrorCode,
            clientIps,
            apiVersion: process.env.API_VERSION,
            serviceVersion: process.env.SERVICE_VERSION,
        };

        return response.status(httpErrorCode).json(responseObject);
    }

    /**
     * Handles success responses
     * @param request - Express request object
     * @param response - Express response object
     * @param message - Success message
     * @param httpCode - HTTP status code (default: 200)
     * @param data - Response data (optional)
     * @param logDataObject - Whether to log the data object (default: true)
     */
    public static success(
        request: express.Request,
        response: express.Response,
        message: string,
        httpCode: number = 200,
        data: any = null,
        logDataObject: boolean = true
    ) {
        const clientIps = request.ips.length > 0 ? request.ips : [request.header('x-forwarded-for') || request.socket.remoteAddress];

        const responseObject = {
            status: 'success',
            message,
            httpCode,
            data,
            clientIps,
            apiVersion: process.env.API_VERSION,
            serviceVersion: process.env.SERVICE_VERSION,
        };

        return response.status(httpCode).json(responseObject);
    }

    /**
     * Handles errors and determines the appropriate response
     * @param request - Express request object
     * @param response - Express response object
     * @param error - Error object
     */
    public static handleError(
        request: express.Request,
        response: express.Response,
        error: Error
    ) {
        if (error instanceof InputValidationError) {
            ResponseHandler.failure(request, response, error.message, error.httpErrorCode, error);
        } else if (error instanceof ApiError) {
            ResponseHandler.failure(request, response, error.errorMessage, error.httpErrorCode, error);
        } else {
            ResponseHandler.failure(request, response, error.message, 500, error);
        }
    }
}