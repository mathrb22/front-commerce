import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';

const user = {
	avatar: '/images/avatars/avatar_4.png',
	city: 'Bauru',
	state: 'SP',
	country: 'Brasil',
	jobTitle: 'Gerente de vendas',
	name: 'José Silva',
	timezone: 'GTM-3',
};

export const AccountProfile = (props: any) => (
	<Card {...props}>
		<CardContent>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Avatar
					src={user.avatar}
					sx={{
						height: 64,
						mb: 2,
						width: 64,
					}}
				/>
				<Typography color='textPrimary' gutterBottom variant='h5'>
					{user.name}
				</Typography>
				<Typography color='textSecondary' variant='body2'>
					{`${user.city} - ${user.state}`}
				</Typography>
				<Typography color='textSecondary' variant='body2'>
					{`${user.country}`}
				</Typography>
				<Typography color='textSecondary' variant='body2'>
					{user.timezone}
				</Typography>
			</Box>
		</CardContent>
		<Divider />
		<CardActions>
			<Button color='primary' fullWidth variant='text'>
				Selecionar foto de perfil
			</Button>
		</CardActions>
	</Card>
);
