import { Request, Response } from 'express';
import { registerUserService } from '../services/user.services'
import { handleFailure, handleSuccess } from '../utils/response.util';
import { error } from 'node:console';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, roleId } = req.body;
    const newUser = await registerUserService({ name, email, password, roleId });

    handleSuccess(res, 'User registered successfully', newUser);
  } catch (error) {
    if (error instanceof Error) {
      handleFailure(res, error.message, 400);
    } else {
      handleFailure(res, 'An unknown error occurred', 400);
    }
  }
};