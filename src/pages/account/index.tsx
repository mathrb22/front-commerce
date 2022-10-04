import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ReactElement, useContext, useEffect } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AccountProfile } from '../../components/account/account-profile';
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
				<title>Conta</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 3,
				}}>
				<Container maxWidth={false} sx={{ px: 3 }}>
					<Typography sx={{ mb: 3 }} variant='h4'>
						Conta
					</Typography>
					<Grid container spacing={3}>
						<Grid item lg={4} md={6} xs={12}>
							<AccountProfile profile={profileData} isLoading={isLoading} />
						</Grid>
						<Grid item lg={8} md={6} xs={12}>
							<AccountProfileDetails profile={profileData} />
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
