import express from 'express';
import { z } from 'zod';
import { userController } from '../controller/userController';
import { validateRequest } from '../utils/validateRequest';

export const userRouter = express.Router();

// Define validation schema
const registerSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
});

userRouter.post(
	'/register',
	validateRequest(registerSchema),
	userController.register,
);
