import { Request, Response, NextFunction } from 'express';

export const authorizeSchoolAdmin = (req: Request, res: Response, next: NextFunction): any => {
  // Check if the authenticated user's roleId is 2 (School Admin)
  if (req.user?.roleId !== 2) {
    return res.status(403).json({ message: 'Access denied. Only School Admins can perform this action.' });
  }

  // If the user is a School Admin, proceed to the next middleware or controller
  next();
};