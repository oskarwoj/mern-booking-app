import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../model/user';

export const userController = {
	register: async (req: Request, res: Response) => {
		try {
			const user = await User.findOne({ email: req.body.email });

			if (user) {
				return res.status(400).json({ message: 'User already exists' });
			}

			const { email, password, firstName, lastName } = req.body;

			const newUser = await User.create({
				email,
				password,
				firstName,
				lastName,
			});

			const token = jwt.sign(
				{ userId: newUser._id },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '1d',
				},
			);

			res.cookie('auth_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 24 * 60 * 60 * 1000,
			});

			res.status(201).json({
				message: 'User created successfully',
				userId: newUser._id,
				token,
			});
		} catch (error) {
			console.error('Error creating a user', error);
			res.status(500).json({ message: 'Error creating a user' });
		}
	},
};
