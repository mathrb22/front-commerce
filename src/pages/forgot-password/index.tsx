import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			showPassword: false,
			name: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Informe um e-mail válido')
				.max(255)
				.required('Informe o e-mail'),
		}),
		onSubmit: async (values) => {
			router.push('/products');
		},
	});

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<ToastContainer />
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(/images/banner-login2.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Esqueci minha senha
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={formik.handleSubmit}
						sx={{ mt: 1, maxWidth: 400 }}>
						<Typography
							variant='body1'
							color='textSecondary'
							component='p'
							sx={{ mt: 2 }}>
							Esqueceu sua senha? Não se preocupe, nós vamos te ajudar! Digite seu
							e-mail cadastrado para redefinir a sua senha.
						</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='E-mail'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.email}
							name='email'
							placeholder='Digite seu e-mail'
							autoComplete='email'
							error={Boolean(formik.touched.email && formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							autoFocus
							sx={{ mb: 2 }}
						/>
						<Button
							type='submit'
							fullWidth
							size='large'
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Enviar
						</Button>
						<Grid container>
							<Grid item xs textAlign={'center'}>
								<Link href='/login' variant='body2'>
									{'Voltar para o Login'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}
