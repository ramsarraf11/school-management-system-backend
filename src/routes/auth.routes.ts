import { validateLogin, validateRegistration } from '../validators/auth.validators';
import { login } from '../controllers/auth.controller';
import express from "express";

//////////////////////////////////////////////////////

const authRouter = express.Router();

authRouter.post('/login', validateLogin, login);

export default authRouter;
