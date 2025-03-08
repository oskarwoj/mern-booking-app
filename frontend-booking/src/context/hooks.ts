import React from 'react';
import AppContext from '.';

export const useAppContext = () => {
	const context = React.useContext(AppContext);
	if (context === undefined) {
		throw new Error('useAppContext must be used within an AppContextProvider');
	}
	return context;
};
