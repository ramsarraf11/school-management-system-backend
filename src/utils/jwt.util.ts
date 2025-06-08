import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use a secure secret key

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' }); // Token expires in 1 hour
};

export const verifyToken = (token: any): any => {
  return jwt.verify(token, SECRET_KEY);
};