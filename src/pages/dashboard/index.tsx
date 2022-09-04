import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ReactElement } from 'react';

const Dashboard = () => (
	<>
		<Head>
			<title>Dashboard | Frontcommerce</title>
		</Head>
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				py: 3,
			}}>
			<Container maxWidth={false}>
				<Grid container spacing={3}></Grid>
			</Container>
		</Box>
	</>
);

Dashboard.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
