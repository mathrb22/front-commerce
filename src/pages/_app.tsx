import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RouteGuard } from '../guards/AuthGuard';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

	return (
		<AuthProvider>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
				<title>FrontCommerce</title>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
		</AuthProvider>
	);
}

export default MyApp;
