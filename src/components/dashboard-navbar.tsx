import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Icon,
	IconButton,
	ThemedProps,
	ThemeOptions,
	Toolbar,
	Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserAvatar from './avatar';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props: any) => {
	const { onSidebarOpen, ...other } = props;

	const { profileData, isLoading } = useContext(AuthContext);

	return (
		<>
			<DashboardNavbarRoot
				sx={{
					left: {
						lg: 280,
					},
					width: {
						lg: 'calc(100% - 280px)',
					},
				}}
				{...other}>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2,
					}}>
					<IconButton
						onClick={onSidebarOpen}
						sx={{
							display: {
								xs: 'inline-flex',
								lg: 'none',
							},
						}}>
						<MenuIcon fontSize='small' />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<Tooltip title='Perfil'>
						<IconButton href='/account'>
							<UserAvatar
								width={40}
								height={40}
								fontSize={20}
								isLoading={isLoading}
								imageUrl={profileData.imageUrl}
								userName={profileData.name}
							/>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</DashboardNavbarRoot>
		</>
	);
};

DashboardNavbar.propTypes = {
	onSidebarOpen: PropTypes.func,
};
