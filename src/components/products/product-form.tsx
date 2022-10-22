import { useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../../shared/interfaces/product';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Typography,
} from '@mui/material';
import Link from 'next/link';

export interface ProductFormProps {
	product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				width: '100%',
				maxWidth: 940,
				mx: 'auto',
				py: 3,
			}}>
			<Container maxWidth={false} sx={{ px: 3 }}>
				<Box
					sx={{
						m: 0,
						maxWidth: 'min-content',
						pb: 2,
						cursor: 'pointer',
						':hover': {
							textDecoration: 'underline',
						},
					}}>
					<Link passHref href='/products'>
						<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<ArrowBack />
							Produtos
						</Typography>
					</Link>
				</Box>
				<Typography sx={{ mb: 3 }} variant='h4'>
					{product?.id ? 'Editar' : 'Adicionar'} produto
				</Typography>
				<form noValidate>
					<Card>
						<CardHeader title='Informações do produto' />
						<Divider />
						<CardContent></CardContent>
					</Card>
				</form>
			</Container>
		</Box>
	);
}
