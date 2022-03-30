import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { ReactElement } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ProductsListToolbar } from '../../components/products/products-list-toolbar';

const Settings = () => (
	<>
		<Head>
			<title>Configurações</title>
		</Head>
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				py: 8,
			}}>
			<Container maxWidth={false}>
			</Container>
		</Box>
	</>
);
Settings.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default Settings;
