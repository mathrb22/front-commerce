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

const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props: any) => {
	const { onSidebarOpen, ...other } = props;

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
					<Tooltip title='Pesquisar'>
						<IconButton sx={{ ml: 1 }}>
							<SearchIcon fontSize='small' />
						</IconButton>
					</Tooltip>
					<Box sx={{ flexGrow: 1 }} />
					<Tooltip title='Notificações'>
						<IconButton sx={{ ml: 1 }}>
							<Badge badgeContent={4} color='primary' variant='dot'>
								<NotificationsIcon fontSize='small' />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Perfil'>
						<IconButton>
							<Avatar
								sx={{
									height: 40,
									width: 40,
								}}
								src='/images/avatars/avatar_4.png'></Avatar>
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
