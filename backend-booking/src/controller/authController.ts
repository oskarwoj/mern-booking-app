import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../model/user';

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export const authController = {
	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'Invalid credential' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid pass' });
			}

			const token = jwt.sign(
				{ userId: user._id },
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
			res.status(200).json({
				message: 'User successfully logged in!',
				userId: user._id,
				token,
			});
		} catch (error) {
			console.error('Error during login', error);
			res.status(500).json({ message: 'Error during login' });
		}
	},
	logout: async (req: Request, res: Response) => {
		res.cookie('auth_token', '', {
			expires: new Date(0),
		});

		res.send();
	},
	verifyToken: async (req: Request, res: Response) => {
		let token;

		if (req.headers.authorization?.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.auth_token) {
			token = req.cookies.auth_token;
		}

		if (!token) {
			return res.status(401).json({ message: 'You are not authorized' });
		}

		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY as string,
			) as JwtPayload;

			req.userId = decoded.userId;

			return res.status(200).json({ userId: req.userId });
		} catch (error) {
			return res.status(401).json({ message: 'You are not authorized' });
		}
	},
};
