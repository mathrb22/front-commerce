import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { Url } from 'url';

export interface NavItemProps {
	href?: string;
	icon: React.ReactElement;
	title: string;
	onClick?: () => void;
}

export const NavItem = (props: NavItemProps) => {
	const { href, icon, title, onClick } = props;
	const router = useRouter();
	const active = href ? router.pathname === href : false;

	return (
		<ListItem
			disableGutters
			sx={{
				display: 'flex',
				mb: 0.5,
				py: 0,
				px: 2,
			}}>
			{href ? (
				<NextLink href={href} passHref>
					<Button
						component='a'
						startIcon={icon}
						disableRipple
						sx={[
							{
								backgroundColor: active ? 'rgba(255,255,255, 0.08)' : 'transparent',
								color: active ? 'secondary.main' : 'grey.300',
								borderRadius: 1,
								justifyContent: 'flex-start',
								px: 3,
								textAlign: 'left',
								textTransform: 'none',
								width: '100%',
								'& .MuiButton-startIcon': {
									color: active ? 'secondary.main' : 'grey.400',
								},
								'&:hover': {
									backgroundColor: 'rgba(255,255,255, 0.08)',
								},
							},
						]}>
						<Box sx={{ flexGrow: 1 }}>{title}</Box>
					</Button>
				</NextLink>
			) : (
				<Button
					onClick={onClick}
					component='a'
					startIcon={icon}
					disableRipple
					sx={[
						{
							backgroundColor: active ? 'rgba(255,255,255, 0.08)' : 'transparent',
							color: active ? 'secondary.main' : 'grey.300',
							borderRadius: 1,
							justifyContent: 'flex-start',
							px: 3,
							textAlign: 'left',
							textTransform: 'none',
							width: '100%',
							'& .MuiButton-startIcon': {
								color: active ? 'secondary.main' : 'grey.400',
							},
							'&:hover': {
								backgroundColor: 'rgba(255,255,255, 0.08)',
							},
						},
					]}>
					<Box sx={{ flexGrow: 1 }}>{title}</Box>
				</Button>
			)}
		</ListItem>
	);
};

NavItem.propTypes = {
	href: PropTypes.string,
	icon: PropTypes.node,
	title: PropTypes.string,
};
