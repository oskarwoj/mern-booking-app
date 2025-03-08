import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppRoutes } from './AppRoutes';
import { AppContextProvider } from './context';
import './index.css';
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router>
				<AppContextProvider>
					<AppRoutes />
					<Toaster visibleToasts={1} position="bottom-center" richColors />
				</AppContextProvider>
			</Router>
		</QueryClientProvider>
	</StrictMode>,
);
