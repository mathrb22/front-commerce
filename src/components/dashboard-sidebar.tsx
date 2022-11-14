import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Theme, useMediaQuery } from '@mui/material';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
	DashboardRounded,
	LogoutRounded,
	PeopleRounded,
	PersonRounded,
	ShoppingBagRounded,
	StorefrontRounded,
} from '@mui/icons-material';

export const DashboardSidebar = (props: any) => {
	const { open, onClose } = props;
	const { logout } = useContext(AuthContext);
	const router = useRouter();
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false,
	});

	const items = [
		{
			href: '/dashboard',
			icon: <DashboardRounded fontSize='small' />,
			title: 'Dashboard',
		},
		{
			href: '/products',
			icon: <ShoppingBagRounded fontSize='small' />,
			title: 'Produtos',
		},
		{
			href: '/inventory',
			icon: <StorefrontRounded fontSize='small' />,
			title: 'Inventário',
		},
		{
			href: '/customers',
			icon: <PeopleRounded fontSize='small' />,
			title: 'Clientes',
		},
		{
			href: '/account',
			icon: <PersonRounded fontSize='small' />,
			title: 'Conta',
		},
		{
			icon: <LogoutRounded fontSize='small' />,
			title: 'Sair',
			onclick: logout,
		},
	];

	useEffect(
		() => {
			if (!router.isReady) {
				return;
			}

			if (open) {
				onClose?.();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.asPath]
	);

	const content = (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}>
				<div>
					<Box sx={{ p: 3 }}>
						<NextLink href='/products' passHref>
							<a>
								<Logo
									sx={{
										height: 42,
										width: 42,
									}}
								/>
							</a>
						</NextLink>
					</Box>
				</div>
				<Divider
					sx={{
						borderColor: '#2D3748',
						my: 3,
					}}
				/>
				<Box sx={{ flexGrow: 1 }}>
					{items.map((item) => (
						<NavItem
							key={item.title}
							icon={item.icon}
							href={item.href}
							onClick={item.onclick}
							title={item.title}
						/>
					))}
				</Box>
			</Box>
		</>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor='left'
				open
				PaperProps={{
					sx: {
						backgroundColor: 'grey.900',
						color: '#FFFFFF',
						width: 280,
					},
				}}
				variant='permanent'>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor='left'
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: 'grey.900',
					color: '#FFFFFF',
					width: 280,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant='temporary'>
			{content}
		</Drawer>
	);
};

DashboardSidebar.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
