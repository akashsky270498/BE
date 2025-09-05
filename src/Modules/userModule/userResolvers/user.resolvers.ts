import redis from '../../../config/redis.config';
import { getAllUsersService } from '../userService/user.service';

export const userResolver = {
  Query: {
    users: async () => {
      const cacheKey = 'users:all';

      //1. Check Redis cache first
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        console.log('Returning data from redis');
        return JSON.parse(cachedData);
      }

      // 2. If not cached, fetch from service
      const result = await getAllUsersService();

      let response;

      if (result.error) {
        response = {
          success: false,
          statusCode: result.status,
          message: result.message,
          errors: [result.message],
          data: [],
          meta: null,
        };
      } else {
        response = {
          success: true,
          statusCode: result.status,
          message: result.message,
          data: result.data,
          errors: [],
          meta: null,
        };
        await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
      }

      return response;
    },
  },
   User: {
    id: (parent: { id?: string; _id: string }) =>
      parent.id || parent._id.toString(),
  },
};
