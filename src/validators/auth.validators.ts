import { Request, Response, NextFunction } from 'express';

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, password } = req.body;

  if (!username && !email || !password) {
    res.status(400).json({ message: 'Email or Username and password are required.' });
    return;
  }

  next();
};

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password, roleId } = req.body;
  
    if (!name || !email || !password || !roleId) {
      res.status(400).json({ message: 'Name, email, password, and roleId are required.' });
      return;
    }
  
    // Additional validation (e.g., email format, password strength) can be added here
    next();
  };