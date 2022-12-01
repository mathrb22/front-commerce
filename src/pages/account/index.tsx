import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ReactElement, useContext, useEffect } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
import { AuthContext } from '../../contexts/AuthContext';

export default function Account() {
	const { profileData, getUserData, isLoading } = useContext(AuthContext);

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<Head>
				<title>Conta | Frontcommerce</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					maxWidth: 940,
					mx: 'auto',
					py: 3,
				}}>
				<Container sx={{ px: 3 }}>
					<Typography sx={{ mb: 3 }} variant='h4'>
						Conta
					</Typography>
					<Grid container spacing={3}>
						<Grid item lg={12} md={12} xs={12}>
							<AccountProfileDetails profile={profileData} isLoading={isLoading} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

Account.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
