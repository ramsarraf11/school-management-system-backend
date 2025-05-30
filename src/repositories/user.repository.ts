import User from '../models/user.model';

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    roleId: number;
}

export const createUser = async (data: any) => {
    return await User.create(data);
};