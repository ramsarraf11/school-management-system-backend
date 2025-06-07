import { Router } from 'express';
import { validateRegistration } from '../validators/auth.validators';
// import { authenticate } from '../middlewares/auth.middleware';
import { registerUser } from '../controllers/user.controller';

const userRouter = Router();



userRouter.post('/register', validateRegistration, registerUser);


// Example of a protected route
// userRouter.get('/profile', authenticate, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route', user: req.user });
// });

export default userRouter;