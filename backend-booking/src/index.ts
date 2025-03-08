import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';

import { authRouter } from './routes/authRoutes';
import { userRouter } from './routes/userRoutes';

export const app = express();

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);

const distPath = path.join(__dirname, '../../../frontend-booking/dist');
console.log('Serving frontend from:', distPath);
app.use(express.static(distPath));

app.get('/health', (req: Request, res: Response) => {
	res.json({ message: 'Health OK!' });
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get('*', (req: Request, res: Response) => {
	res.sendFile(
		path.join(__dirname, '../../../frontend-booking/dist/index.html'),
	);
});
