import { useAppContext } from '@/context/hooks';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as apiClient from '../api';

export interface SignInFormData {
	email: string;
	password: string;
}

export const SignIn: React.FC = () => {
	const navigate = useNavigate();
	const { invalidateToken } = useAppContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>();

	const mutation = useMutation({
		mutationFn: apiClient.signIn,
		onSuccess: async () => {
			// After successful login, update the auth state in AppContext
			invalidateToken();
			toast.success('Sign in successful');
			navigate('/');
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-3xl font-bold">Sign In</h2>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Email{''}
				<input
					type="email"
					className="border border-gray-300  rounded w-full py-1 px-2 font-normal"
					{...register('email', { required: 'This field is required' })}
				></input>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
			</label>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Password{''}
				<input
					type="password"
					className="border border-gray-300  rounded w-full py-1 px-2 font-normal"
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
						},
					})}
				></input>
				{errors.password && (
					<span className="text-red-500">{errors.password.message}</span>
				)}
			</label>
			<span className="flex items-center justify-between">
				<span className="text-sm">
					Not Registered?{' '}
					<Link className="underline" to="/register">
						Create an account here
					</Link>
				</span>
				<button
					type="submit"
					className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
				>
					Login
				</button>
			</span>
		</form>
	);
};
