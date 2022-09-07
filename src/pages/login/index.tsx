import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext, SignInCredentials } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERole } from '../../shared/enums/role.enum';
import { LoadingButton } from '@mui/lab';

export default function Login() {
	const router = useRouter();
	const { login, isLoading } = useContext(AuthContext);

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
			password: Yup.string()
				.max(255)
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Informe a senha')
				.nullable(),
			showPassword: Yup.boolean(),
		}),
		onSubmit: async ({ email, password }) => {
			const credentials: SignInCredentials = {
				login: email,
				password: password,
				role: ERole.ADMIN,
			};
			await login(credentials);
		},
	});

	const handleClickShowPassword = () => {
		formik.setFieldValue('showPassword', !formik.values.showPassword);
	};

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	return (
		<>
			<ToastContainer />
			<Grid container component='main' sx={{ height: '100vh' }}>
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
							Acessar plataforma
						</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={formik.handleSubmit}
							sx={{ mt: 1, maxWidth: 400 }}>
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
								autoComplete='off'
								error={Boolean(formik.touched.email && formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								autoFocus
								sx={{ mb: 2 }}
							/>
							<TextField
								id='outlined-adornment-password'
								type={formik.values.showPassword ? 'text' : 'password'}
								fullWidth
								required
								value={formik.values.password}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								error={Boolean(formik.touched.password && formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge='end'>
												{formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								name='password'
								label='Senha'
								placeholder='Digite sua senha'
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Lembrar-me'
								sx={{ mt: 1 }}
							/>
							<LoadingButton
								loading={isLoading}
								type='submit'
								fullWidth
								size='large'
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								Entrar
							</LoadingButton>
							<Grid container sx={{ mb: 4 }}>
								<Grid item xs textAlign={'end'}>
									<Link href='/forgot-password' variant='body2'>
										Esqueceu sua senha?
									</Link>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs textAlign={'center'}>
									Não possui uma conta?{' '}
									<Link href='/signup' variant='body2'>
										{'Cadastre-se'}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
