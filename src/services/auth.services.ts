import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.util';
import { findUserByIdentifier } from '../repositories/user.repository';

/**
 * Authenticate a user by username or email and password
 * @param identifier - The username or email of the user
 * @param password - The user's password
 * @returns A JWT token if authentication is successful
 */
export const loginService = async (identifier: string, password: string): Promise<any> => {
  try {
    const user = await findUserByIdentifier(identifier);
    if (!user) {
      throw new Error('Invalid username/email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = generateToken({ id: user.id, email: user.email, username: user.username, roleId: user.roleId });
  
    return token;
  } catch (error) {
    console.error('Error during login:', error);
  }
};