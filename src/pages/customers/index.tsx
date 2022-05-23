import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { ReactElement } from 'react';
import { customers } from '../../__mocks__/customers';
import { DashboardLayout } from '../../components/dashboard-layout';

const Customers = () => (
	<>
		<Head>
			<title>Clientes</title>
		</Head>
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				py: 3,
			}}>
			<Container maxWidth={false}>
				<CustomerListToolbar />
				<Box sx={{ mt: 3 }}>
					<CustomerListResults data={customers} />
				</Box>
			</Container>
		</Box>
	</>
);
Customers.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default Customers;
