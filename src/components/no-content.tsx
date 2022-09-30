import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface NoContentProps {
	text?: string;
	description?: string;
	image?: string;
}

export function NoContent({
	text = 'Nenhum registro encontrado',
	description,
}: NoContentProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
			}}>
			<Image
				alt='Imagem de nenhum resultado encontrado'
				src='/images/no-search-results.svg'
				width={140}
				height={140}
			/>
			<Typography variant='body1' component='span' sx={{ mt: 3 }}>
				{text}
			</Typography>
			<Typography variant='body2' component='span' sx={{ mt: 1 }}>
				{description}
			</Typography>
		</Box>
	);
}
