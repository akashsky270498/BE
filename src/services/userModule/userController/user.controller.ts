import { registerUserService } from '../userService/user.service';
import { Request, Response } from 'express';
import RESPONSE from '../../../utils/response';
import { asyncHandler } from '../../../utils/asyncHandler';
import redis from "../../../config/redis.config";
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
    avatar:avatarUrl,
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

export { registerUser };
