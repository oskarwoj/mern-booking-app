import { useAppContext } from '@/context/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton } from './SignOutButton';

export const Header: React.FC = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<div className="bg-blue-800 py-6">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl text-white font-bold tracking-tight">
					<Link to="/">MernHolidays.com</Link>
				</span>
				<span className="flex space-x-2">
					{isLoggedIn ? (
						<SignOutButton />
					) : (
						<Link
							to="/sign-in"
							className="flex items-center text-blue-600 px-3 font-bold bg-white  hover:bg-gray-300"
						>
							Sign In
						</Link>
					)}
				</span>
			</div>
		</div>
	);
};
