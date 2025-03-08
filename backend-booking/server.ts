import mongoose from 'mongoose';
import { app } from './src';

const PORT = process.env.PORT ?? 8000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
	console.log('Connected to database 🔥');

	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
});
