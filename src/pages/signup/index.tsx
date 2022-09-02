import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {
	FormControl,
	FormLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

export type SignupFormValues = {
	name: string;
	secondName: string;
	gender: string;
	birthDate: string;
	email: string;
	password: string;
	showPassword: boolean;
	registerType: number;
};

export default function Signup() {
	const router = useRouter();

	const genderList = [
		{
			id: 1,
			value: 'Masculino',
		},
		{
			id: 2,
			value: 'Feminino',
		},
	];

	const formik = useFormik({
		initialValues: {
			name: '',
			secondName: '',
			gender: '',
			birthDate: '',
			email: '',
			password: '',
			showPassword: false,
			registerType: 1,
		},
		validate: (values) => {
			let errors: Partial<SignupFormValues> = {};

			if (values.registerType == 1 && !values.birthDate)
				errors.birthDate = 'Informe sua data de nascimento';

			if (values.registerType == 1 && values.birthDate) {
				const birthDate = moment(values.birthDate, 'DD/MM/YYYY', true);
				if (!birthDate.isValid()) errors.birthDate = 'Data de nascimento inválida';
			}

			if (values.registerType == 1 && !values.name)
				errors.name = 'Informe seu nome';

			if (values.registerType == 2 && !values.name)
				errors.name = 'Informe a razão social';

			if (values.registerType == 1 && !values.secondName)
				errors.secondName = 'Informe seu sobrenome';

			if (values.registerType == 2 && !values.name)
				errors.secondName = 'Informe o nome fantasia';

			return errors;
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			secondName: Yup.string().required(),
			email: Yup.string()
				.email('Informe um e-mail válido')
				.max(255)
				.required('Informe o e-mail'),
			gender: Yup.string(),
			birthDate: Yup.string().required('Informe sua data de nascimento'),
			password: Yup.string()
				.max(255)
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Informe a senha')
				.nullable(),
			showPassword: Yup.boolean(),
		}),
		onSubmit: () => {
			console.log(formik.values);
			// router.push('/login');
		},
	});

	useEffect(() => {
		// console.log(formik.values);
	}, []);

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
						<FormControl sx={{ mt: 3 }}>
							<FormLabel>Tipo de cadastro</FormLabel>
							<RadioGroup
								row
								name='row-radio-buttons-group'
								color='primary'
								onChange={(e) => formik.setFieldValue('registerType', e.target.value)}
								value={formik.values.registerType}>
								<FormControlLabel value='1' control={<Radio />} label='Pessoa Física' />
								<FormControlLabel
									value='2'
									control={<Radio />}
									label='Pessoa Jurídica'
								/>
							</RadioGroup>
						</FormControl>

						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label={formik.values.registerType == 1 ? 'Nome' : 'Razão Social'}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.name}
							name='name'
							placeholder={
								formik.values.registerType == 1
									? 'Digite seu nome'
									: 'Digite a razão social'
							}
							autoComplete='name'
							error={Boolean(formik.touched.name && formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='secondName'
							label={formik.values.registerType == 1 ? 'Sobrenome' : 'Nome Fantasia'}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.secondName}
							name='secondName'
							placeholder={
								formik.values.registerType == 1
									? 'Digite seu sobrenome'
									: 'Digite o nome fantasia'
							}
							autoComplete='secondName'
							error={Boolean(formik.touched.secondName && formik.errors.secondName)}
							helperText={formik.touched.secondName && formik.errors.secondName}
							autoFocus
						/>

						{formik.values.registerType == 1 && (
							<TextField
								margin='normal'
								fullWidth
								id='gender'
								label='Gênero'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.gender}
								name='gender'
								placeholder='Selecione seu gênero'
								select
								variant='outlined'>
								<MenuItem value=''>Selecionar</MenuItem>
								{genderList.map((gender) => (
									<MenuItem key={gender.id} value={gender.value}>
										{gender.value}
									</MenuItem>
								))}
							</TextField>
						)}

						{formik.values.registerType == 1 && (
							<DatePicker
								label='Data de nascimento'
								onChange={(date) => {
									console.log(formik.errors);
									formik.setFieldValue('birthDate', date);
								}}
								onError={(error) => {
									formik.setFieldError('birthDate', error?.toString());
									console.log(formik.errors);
								}}
								value={formik.values.birthDate ? formik.values.birthDate : null}
								renderInput={(params) => (
									<TextField
										margin='normal'
										fullWidth
										required
										id='birthDate'
										onBlur={formik.handleBlur}
										error={Boolean(formik.touched.birthDate && formik.errors.birthDate)}
										helperText={formik.touched.birthDate && formik.errors.birthDate}
										name='birthDate'
										variant='outlined'
										{...params}
									/>
								)}
							/>
						)}

						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='E-mail'
							onBlur={formik.handleBlur}
							onChange={(email) => {
								console.log(formik.errors);
								formik.setFieldValue('email', email.target.value);
							}}
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
