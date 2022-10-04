import { useState, useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react-imask/dist/mixin';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { genderList } from '../../../shared/consts/genders';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { ArrowBack } from '@mui/icons-material';
import { createContact } from '../../../services/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';

export default function AddCustomerForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			secondName: '',
			personType: 1,
			documentNumber: '',
			birthdate: null,
			address: '',
			gender: '',
			email: '',
			phone: '',
		},
		validate: (values) => {
			const errors: any = {};
			if (values.personType == 1) {
				if (!values.name) errors.name = 'Informe seu nome';
				if (!values.secondName) errors.secondName = 'Informe seu sobrenome';
				if (!values.birthdate) {
					errors.birthdate = 'Informe sua data de nascimento';
				}
			} else {
				if (!values.name) errors.name = 'Informe a razão social';
				if (!values.secondName) errors.secondName = 'Informe o nome fantasia';
				if (!values.birthdate) {
					delete errors.birthdate;
				}
			}
			return errors;
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			setIsSubmitting(true);
			const contact = values;
			await addCustomer(contact);
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			secondName: Yup.string().required(),
			email: Yup.string()
				.email('Informe um e-mail válido')
				.max(255)
				.required('Informe o e-mail'),
			personType: Yup.number(),
			documentNumber: Yup.string(),
			address: Yup.string(),
			gender: Yup.string(),
			phone: Yup.string()
				.required('Informe o número do celular')
				.min(11, 'Informe um número de celular válido')
				.max(11, 'Informe um número de celular válido'),
			birthdate: Yup.string(),
		}),
	});

	function addCustomer(contact: Contact) {
		toast.configure();
		setIsSubmitting(true);
		createContact(contact).then(
			async (response) => {
				setIsSubmitting(false);
				if (response.status == 200 && response.data) {
					toast.success('Cliente adicionado com sucesso!', {
						position: 'top-center',
						autoClose: 3000,
						theme: 'colored',
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				}
			},
			(error) => {
				setIsSubmitting(false);
				toast.error('Erro ao adicionar o cliente. Tente novamente!', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		);
	}

	return (
		<>
			<Head>
				<title>Adicionar cliente</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
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
						<Link passHref href='/customers'>
							<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<ArrowBack />
								Clientes
							</Typography>
						</Link>
					</Box>
					<Typography sx={{ mb: 3 }} variant='h4'>
						Adicionar cliente
					</Typography>
					<form noValidate onSubmit={formik.handleSubmit}>
						<Card>
							<CardHeader title='Dados pessoais' />
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label={formik.values.personType == 1 ? 'Nome' : 'Razão Social'}
											name='name'
											onChange={formik.handleChange}
											required
											value={formik.values.name}
											placeholder={
												formik.values.personType == 1
													? 'Digite seu nome'
													: 'Digite a razão social'
											}
											autoComplete='name'
											error={Boolean(formik.touched.name && formik.errors.name)}
											helperText={formik.touched.name && formik.errors.name}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label={formik.values.personType == 1 ? 'Sobrenome' : 'Nome Fantasia'}
											name='secondName'
											onChange={formik.handleChange}
											required
											value={formik.values.secondName}
											placeholder={
												formik.values.personType == 1
													? 'Digite seu sobrenome'
													: 'Digite o nome fantasia'
											}
											autoComplete='secondName'
											error={Boolean(
												formik.touched.secondName && formik.errors.secondName
											)}
											helperText={formik.touched.secondName && formik.errors.secondName}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											required
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
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											type='number'
											inputProps={{ inputMode: 'numeric' }}
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
											helperText={formik.touched.phone && formik.errors.phone}
										/>
									</Grid>
									{formik.values.personType == 1 && (
										<>
											<Grid item md={6} xs={12}>
												<TextField
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
											</Grid>
											<Grid item md={6} xs={12}>
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
															fullWidth
															id='birthdate'
															onBlur={formik.handleBlur}
															error={Boolean(
																formik.touched.birthdate && formik.errors.birthdate
															)}
															helperText={formik.touched.birthdate && formik.errors.birthdate}
															name='birthdate'
															variant='outlined'
															{...params}
														/>
													)}
												/>
											</Grid>
										</>
									)}
									<Grid item md={12} xs={12}>
										<TextField
											fullWidth
											id='address'
											label='Endereço'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.address}
											name='address'
											placeholder='Digite seu endereço'
											autoComplete='off'
											variant='outlined'
											error={Boolean(formik.touched.address && formik.errors.address)}
											helperText={formik.touched.address && formik.errors.address}
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									pl: 2,
									pr: 2,
								}}>
								<LoadingButton
									loading={isSubmitting}
									type='submit'
									color='primary'
									size='large'
									variant='contained'
									sx={{ mt: 3, mb: 2 }}>
									Salvar alterações
								</LoadingButton>
							</Box>
						</Card>
					</form>
				</Container>
			</Box>
		</>
	);
}

AddCustomerForm.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);