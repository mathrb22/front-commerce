import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
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
import { useContext } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { AuthContext, ISignUp } from '../../contexts/AuthContext';
import { EPersonType } from '../../shared/enums/person-type.enum';

export type SignupFormValues = {
	name: string;
	secondName: string;
	gender: string;
	birthdate: string;
	documentNumber: string;
	phone: string;
	email: string;
	password: string;
	showPassword: boolean;
	registerType: number;
};

export default function Signup() {
	const router = useRouter();
	const { register, isLoading } = useContext(AuthContext);

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
			documentNumber: '',
			gender: '',
			birthdate: '',
			phone: '',
			email: '',
			password: '',
			showPassword: false,
			registerType: 1,
		},
		validate: (values) => {
			let errors: Partial<SignupFormValues> = {};

			if (values.registerType == 1) {
				if (!values.name) errors.name = 'Informe seu nome';
				if (!values.secondName) errors.secondName = 'Informe seu sobrenome';
				if (!values.documentNumber) errors.documentNumber = 'Informe seu CPF';
				if (!values.birthdate) {
					errors.birthdate = 'Informe sua data de nascimento';
				} else {
					const birthdate = moment(values.birthdate, 'DD/MM/YYYY', true);
					if (!birthdate.isValid()) errors.birthdate = 'Data de nascimento inválida';
				}
			} else {
				if (!values.name) errors.name = 'Informe a razão social';
				if (!values.secondName) errors.secondName = 'Informe o nome fantasia';
				if (!values.documentNumber) errors.documentNumber = 'Informe seu CNPJ';
				if (!values.birthdate) {
					delete errors.birthdate;
				}
			}

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
			documentNumber: Yup.string().required(),
			phone: Yup.string()
				.required('Informe o número do celular')
				.min(11, 'Informe um número de celular válido')
				.max(11, 'Informe um número de celular válido'),
			birthdate: Yup.string(),
			password: Yup.string()
				.max(255)
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Informe a senha')
				.nullable(),
			showPassword: Yup.boolean(),
		}),
		onSubmit: async (values) => {
			const signupBody: ISignUp = {
				name: values.name,
				secondName: values.secondName,
				documentNumber: values.documentNumber,
				personType:
					values.registerType == 1
						? EPersonType.NaturalPerson
						: EPersonType.LegalPerson,
				phone: values.phone,
				email: values.email,
				password: values.password,
			};
			if (values.registerType == 1) {
				signupBody.gender = values.gender;
				signupBody.birthdate = values.birthdate;
			}
			await register(signupBody);
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
					height: '100%',
				}}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
				sx={{
					height: '100%',
					overflow: 'auto',
				}}>
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
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							id='documentNumber'
							label={formik.values.registerType == 1 ? 'CPF' : 'CNPJ'}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.documentNumber}
							variant='outlined'
							name='documentNumber'
							placeholder={
								formik.values.registerType == 1 ? 'Digite seu CPF' : 'Digite seu CNPJ'
							}
							autoComplete='documentNumber'
							error={Boolean(
								formik.touched.documentNumber && formik.errors.documentNumber
							)}
							helperText={
								formik.touched.documentNumber && formik.errors.documentNumber
							}></TextField>

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
									formik.setFieldValue('birthdate', date);
								}}
								onError={(error) => {
									formik.setFieldError('birthdate', error?.toString());
								}}
								value={formik.values.birthdate ? formik.values.birthdate : null}
								renderInput={(params) => (
									<TextField
										margin='normal'
										fullWidth
										id='birthdate'
										onBlur={formik.handleBlur}
										error={Boolean(formik.touched.birthdate && formik.errors.birthdate)}
										helperText={formik.touched.birthdate && formik.errors.birthdate}
										name='birthdate'
										variant='outlined'
										{...params}
									/>
								)}
							/>
						)}

						<TextField
							type='number'
							inputProps={{ inputMode: 'numeric' }}
							margin='normal'
							required
							fullWidth
							id='phone'
							label='Celular'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.phone}
							name='phone'
							placeholder='Digite seu celular'
							autoComplete='phone'
							variant='outlined'
							error={Boolean(formik.touched.phone && formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}></TextField>

						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='E-mail'
							onBlur={formik.handleBlur}
							onChange={(email) => {
								formik.setFieldValue('email', email.target.value);
							}}
							value={formik.values.email}
							name='email'
							placeholder='Digite seu e-mail'
							autoComplete='off'
							error={Boolean(formik.touched.email && formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
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
						<LoadingButton
							loading={isLoading}
							type='submit'
							fullWidth
							size='large'
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Cadastrar-se
						</LoadingButton>
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
