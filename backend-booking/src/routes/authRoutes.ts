import express from 'express';
import { z } from 'zod';
import { authController } from '../controller/authController';
import { validateRequest } from '../utils/validateRequest';

export const authRouter = express.Router();

const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
});

authRouter.get('/validate-token', authController.verifyToken);

authRouter.post('/login', validateRequest(loginSchema), authController.login);
authRouter.post('/logout', authController.logout);
