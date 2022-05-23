import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { ReactElement } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ProductsListToolbar } from '../../components/products/products-list-toolbar';
import { AccountProfile } from '../../components/account/account-profile';
import { AccountProfileDetails } from '../../components/account/account-profile-details';

const Account = () => (
	<>
		<Head>
			<title>Conta</title>
		</Head>
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				py: 3,
			}}>
			<Container maxWidth={false}>
				<Typography sx={{ mb: 3 }} variant='h4'>
					Conta
				</Typography>
				<Grid container spacing={3}>
					<Grid item lg={4} md={6} xs={12}>
						<AccountProfile />
					</Grid>
					<Grid item lg={8} md={6} xs={12}>
						<AccountProfileDetails />
					</Grid>
				</Grid>
			</Container>
		</Box>
	</>
);
Account.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default Account;
