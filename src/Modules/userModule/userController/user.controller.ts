import { registerUserService, loginUserService } from '../userService/user.service';
import { Request, Response } from 'express';
import RESPONSE from '../../../utils/response';
import { asyncHandler } from '../../../utils/asyncHandler';
import redis from '../../../config/redis.config';
import { HTTP_STATUS_CODES } from '../../../utils/constants';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, username, password, avatarUrl } = req.body;
  // const avatar = req.file?.path;

  if (!avatarUrl) {
    return RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
      message: 'Avatar URL is required. Upload file first.',
    });
  }

  const result = await registerUserService({
    fullName,
    email,
    username,
    password,
    avatar: avatarUrl,
  });

  if (result.error) {
    return RESPONSE.FailureResponse(res, result.status, {
      message: result.message,
    });
  }

  if (!result.error) {
    // Clear old cached list
    await redis.del('users:all');
  }

  return RESPONSE.SuccessResponse(res, result.status, {
    message: result.message,
    data: [result.data],
  });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
      message: 'Email || Username and password are required.',
    });
  }

  const result = await loginUserService({ emailOrUsername, password });

  if (result.error) {
    return RESPONSE.FailureResponse(res, result.status, {
      message: result.message,
    });
  }

  if (!result.data) {
    return RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: 'Login failed unexpectedly.',
    });
  }
  const { refreshToken, ...rest } = result.data;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // only send over HTTPS in prod
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  await redis.del('users:all');

  return RESPONSE.SuccessResponse(res, result.status, {
    message: result.message,
    data: [
      {
        user: rest.user,
        accessToken: rest.accessToken,
      },
    ],
  });
});

export { registerUser, loginUser };
