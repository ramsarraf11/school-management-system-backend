import { Request, Response } from 'express';
import { loginService } from '../services/auth.services';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body.email || req.body.username
    const password = req.body.password

    const identifier = data.trim().toLowerCase();
    const token = await loginService(identifier, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid username/email or password' });
    }

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: error });
  }
};