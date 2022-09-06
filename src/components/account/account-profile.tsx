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
import { Contact } from '../../shared/interfaces/customer';
import UserAvatar from '../avatar';
import Skeleton from '@mui/material/Skeleton';

export interface AccountProfileProps {
	profile: Contact;
	isLoading?: boolean;
}

export const AccountProfile = ({ profile, isLoading }: AccountProfileProps) => (
	<Card>
		<CardContent>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}>
				{profile && !isLoading ? (
					<>
						<UserAvatar
							imageUrl={profile.imageUrl}
							userName={profile.name}
							width={64}
							height={64}
						/>
						<Typography
							color='textPrimary'
							gutterBottom
							variant='h5'
							textAlign='center'>
							{profile?.name + ' ' + profile?.secondName}
						</Typography>
						<Typography color='textSecondary' variant='body2'>
							{`${profile?.address ?? 'Endereço não informado'}`}
						</Typography>
					</>
				) : (
					<>
						<Skeleton
							animation='wave'
							variant='circular'
							width={64}
							height={64}
							sx={{ mb: 2 }}
						/>
						<Skeleton
							animation='wave'
							sx={{ mb: 2 }}
							variant='rectangular'
							width={210}
							height={50}
						/>
						<Skeleton
							animation='wave'
							variant='rectangular'
							width={210}
							height={24}
						/>
					</>
				)}
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
