import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Page404() {
	return (
		<>
			<Head>
				<title>Página não encontrada | Frontcommerce</title>
			</Head>
			<Box
				component='main'
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					minHeight: '100%',
				}}>
				<Container maxWidth='md'>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Typography align='center' color='textPrimary' variant='h3'>
							Ops! Não conseguimos encontrar a página que você está procurando.
						</Typography>
						<Typography
							align='center'
							color='textPrimary'
							marginTop={4}
							variant='subtitle1'>
							Verifique o endereço digitado ou volte para a tela inicial.
						</Typography>
						<Box sx={{ textAlign: 'center' }}>
							<Image
								alt='Imagem de página não encontrada'
								src='/images/404.svg'
								width={460}
								height={460}
							/>
						</Box>
						<Link href='/products' passHref>
							<Button
								component='a'
								startIcon={<ArrowBack fontSize='small' />}
								sx={{ mt: 3 }}
								variant='contained'>
								Voltar para a home
							</Button>
						</Link>
					</Box>
				</Container>
			</Box>
		</>
	);
}
