import { Request, Response } from 'express';
import { loginService } from '../services/auth.services';
import { ResponseHandler } from '../utils/response.handler';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body.email || req.body.username;
    const password = req.body.password;

    const identifier = data.trim().toLowerCase();
    const token = await loginService(identifier, password);

    if (!token) {
      ResponseHandler.failure(req, res, 'Invalid username/email or password', 401);
      return
    }

    ResponseHandler.success(req, res, 'Login successful', 200, { token });
  } catch (error) {
    console.error('Error during login:', error);
    ResponseHandler.failure(req, res, 'An error occurred during login', 500, error instanceof Error ? error : undefined);
  }
};