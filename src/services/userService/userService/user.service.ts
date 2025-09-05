import { checkExistingUser, createNewUser, sanitizeUser } from '../userDBCall/user.dbcall';
import { UserModel } from '../userModel/user.model';
import { HTTP_STATUS_CODES } from '../../../utils/constants';

interface RegisterUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export const registerUserService = async (input: RegisterUser) => {
  const { fullName, email, username, password, avatar } = input;

  const existingUser = await checkExistingUser(email as string, username as string);

  if (existingUser) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.CONFLICT,
      message: 'User with these email or username already exists. Please login!',
    };
  }


  const user = await createNewUser({
    fullName,
    email,
    username,
    password,
    avatar ,
  });

  const createdUser = await sanitizeUser(user._id.toString());

  if (!createdUser) {
    return { error: true, status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, message: 'User creation failed.' };
  }

  return { error: false, status: HTTP_STATUS_CODES.CREATED, message: 'User registered successfully.', data: createdUser };
};

export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find();
    // const usersWithVirtuals = users.map((u) =>
    //   u.toObject({ virtuals: true })
    // );

    return {
      error: false,
      status: HTTP_STATUS_CODES.SUCCESS,
      message: 'Users fetched successfully',
      data: users,
    };
  } catch (error) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch users',
      data: [],
    };
  }
};
