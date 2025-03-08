import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync(req.body);
			return next();
		} catch (error) {
			return res.status(400).json({
				message: 'Validation failed',
				errors: (error as { format: () => unknown }).format(),
			});
		}
	};
