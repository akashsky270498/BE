import { Router } from 'express';
import { registerUser } from '../userController/user.controller';
import { upload } from '../../../middlewares/multer.middleware';
import { registerUserValidation } from '../userValidation/user.validation';
import { validate } from '../../../middlewares/validation.middleware';

const router = Router();

router.post('/register', upload.single('avatar'), validate(registerUserValidation), registerUser);

export default router;
