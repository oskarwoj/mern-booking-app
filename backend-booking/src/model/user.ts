import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export interface UserType {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
	}

	next();
});

export const User = mongoose.model<UserType>('User', userSchema);
