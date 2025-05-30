import bcrypt from 'bcrypt';
import { createUser } from '../repositories/user.repository';
import Role from '../models/role.model';

interface RegisterUserInput { 
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export const registerUserService = async ({ name, email, password, roleId }: RegisterUserInput) => {
  // Check if the role exists
  const role = await Role.findOne({ where: { id: roleId } });
  if (!role) {
    throw new Error('Invalid roleId. Role does not exist.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    roleId,
  });

  return newUser;
};