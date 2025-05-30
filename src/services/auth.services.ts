import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.util';
import { findUserByEmail } from '../repositories/user.repository';
import { createUser } from '../repositories/user.repository';
import Role from '../models/role.model';


//////////////////////////////////////////////////////////////


export const loginService = async (email: string, password: string): Promise<string> => {
  // Find the user by email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate a JWT token
  const token = generateToken({ id: user.id, email: user.email, roleId: user.roleId });

  return token;
};