import { UserModel } from '../userModel/user.model';

export const checkExistingUser = async (email: string, username: string) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  return existingUser;
};

export const createNewUser = async (userData: unknown) => {
  const createUser = await UserModel.create(userData);
  return createUser;
};

export const sanitizeUser = async (userId: string) => {
  const sanitizedUser = await UserModel.findById(userId).select('-password -refreshToken');
  return sanitizedUser;
};

