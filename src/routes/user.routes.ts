import { Router } from 'express';
import { validateRegistration } from '../validators/user.validators';
import { authenticate } from '../middlewares/auth.middleware';
import { registerUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', authenticate, validateRegistration, registerUser);

export default userRouter;