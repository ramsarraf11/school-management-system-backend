import User from '../models/user.model';
import { Op } from 'sequelize';



export const findUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    roleId: number;
    username: string;
}

export const createUser = async (data: any) => {
    return await User.create(data);
};

export const findUserByIdentifier = async (identifier: string) => {
    return await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier }, // Match by email
          { username: identifier }, // Match by username
        ],
      },
    });
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: ['role', 'organization'], // assuming associations are set
  });
};
