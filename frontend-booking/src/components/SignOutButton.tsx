import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { useAppContext } from '@/context/hooks';
import { toast } from 'sonner';
import * as apiClient from '../api';

export const SignOutButton: React.FC = () => {
	const { invalidateToken } = useAppContext();

	const mutation = useMutation({
		mutationFn: apiClient.signOut,
		onSuccess: async () => {
			invalidateToken();
			toast.success('Logout successfully');
		},
		onError: (error: Error) => {
			console.error(error);
			toast.error(`Error during logout`);
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button
			onClick={handleClick}
			className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-300"
		>
			Sign Out
		</button>
	);
};
