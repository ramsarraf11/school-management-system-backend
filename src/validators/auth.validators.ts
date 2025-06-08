import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().optional().messages({
    'string.empty': 'Email is required.',
  }),
  username: Joi.string().optional().messages({
    'string.empty': 'Username is required.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required.',
  }),
});

export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ message: 'Validation failed', errors: errorMessages });
    return;
  }
  next();
}