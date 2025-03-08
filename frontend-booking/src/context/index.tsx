import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo } from 'react';
import * as apiClient from '../api';

export interface AppContext {
	isLoggedIn: boolean;
	invalidateToken: () => void;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const queryClient = useQueryClient();

	const { isError } = useQuery({
		queryKey: ['validateToken'],
		queryFn: apiClient.validateToken,
		retry: false,
	});

	const invalidateToken = useCallback(async () => {
		await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
	}, [queryClient]);

	const value = useMemo(
		() => ({
			isLoggedIn: !isError,
			invalidateToken,
		}),
		[isError, invalidateToken],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
