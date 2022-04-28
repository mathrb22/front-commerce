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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export default function Signup() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			showPassword: false,
			name: null,
		},
		validationSchema: Yup.object({
			fullName: Yup.string().required('Informe o nome completo'),
			email: Yup.string()
				.email('Informe um e-mail válido')
				.max(255)
				.required('Informe o e-mail'),
			password: Yup.string()
				.max(255)
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Informe a senha')
				.nullable(),
			confirmPassword: Yup.string()
				.max(255)
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Confirme a senha')
				.nullable(),
			showPassword: Yup.boolean(),
		}),
		onSubmit: () => {
			router.push('/products');
		},
	});

	const handleClickShowPassword = () => {
		formik.setFieldValue('showPassword', !formik.values.showPassword);
	};

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	return (
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
						Cadastre-se na plataforma
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
							id='name'
							label='Nome completo'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.fullName}
							name='fullName'
							placeholder='Digite seu nome completo'
							autoComplete='name'
							error={Boolean(formik.touched.fullName && formik.errors.fullName)}
							helperText={formik.touched.fullName && formik.errors.fullName}
							autoFocus
						/>
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
							sx={{ mb: 2 }}
						/>
						<TextField
							id='outlined-adornment-password'
							type={formik.values.showPassword ? 'text' : 'password'}
							fullWidth
							required
							value={formik.values.confirmPassword}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={Boolean(
								formik.touched.confirmPassword && formik.errors.confirmPassword
							)}
							helperText={
								formik.touched.confirmPassword && formik.errors.confirmPassword
							}
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
							name='confirmPassword'
							label='Confirmar Senha'
							placeholder='Digite sua senha'
							sx={{ mb: 2 }}
						/>
						<Button
							type='submit'
							fullWidth
							size='large'
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Cadastrar-se
						</Button>
						<Grid container>
							<Grid item xs textAlign={'center'}>
								Já possui uma conta?{' '}
								<Link href='/login' variant='body2'>
									{'Entrar'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}
