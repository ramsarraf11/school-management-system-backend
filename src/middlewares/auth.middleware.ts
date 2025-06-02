import { verifyToken } from "../utils/jwt.util";
import { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization token missing or malformed' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    console.error('[AUTH ERROR]', error?.message || error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};