import { Request, Response } from 'express';
import { loginService } from '../services/auth.services';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Call the service to authenticate the user
    const token = await loginService(email, password);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: error });
  }
};