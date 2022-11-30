import { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import {
	Box,
	Container,
	Typography,
	Card,
	CardHeader,
	Divider,
	CardContent,
	Grid,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	TextField,
	MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import { genderList } from '../../shared/consts/genders';
import { useRouter } from 'next/router';
import { IContact } from '../../shared/interfaces/contact';
import {
	createContact,
	updateContactInfo,
	getContactInfo,
} from '../../services/contacts.service';
import { EPersonType } from '../../shared/enums/person-type.enum';

export interface CustomerFormProps {
	customer?: IContact;
}

export default function CustomerForm({ customer }: CustomerFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: customer ? customer?.name : '',
			secondName: customer ? customer?.secondName : '',
			personTypeId: customer ? customer?.personTypeId : 1,
			documentNumber: customer ? customer?.documentNumber : '',
			birthdate:
				customer && customer?.birthdate ? moment(customer?.birthdate) : null,
			address: customer ? customer?.address : '',
			gender: customer ? customer.gender : '',
			email: customer ? customer?.email : '',
			phone: customer ? customer?.phone : '',
		},
		enableReinitialize: true,
		validate: (values: IContact) => {
			let errors: Partial<IContact> = {};

			if (values.personTypeId == 1) {
				if (!values.name) errors.name = 'Informe o nome';
				if (!values.secondName) errors.secondName = 'Informe o sobrenome';
				if (!values.documentNumber) errors.documentNumber = 'Informe o CPF';
				if (!values.birthdate) {
					errors.birthdate = 'Informe a data de nascimento';
				} else {
					const birthdate = moment(values.birthdate, 'DD/MM/YYYY', true);
					if (!birthdate.isValid()) errors.birthdate = 'Data de nascimento inválida';
				}
			} else if (values.personTypeId == 2) {
				if (!values.name) errors.name = 'Informe a razão social';
				if (!values.secondName) errors.secondName = 'Informe o nome fantasia';
				if (!values.documentNumber) errors.documentNumber = 'Informe o CNPJ';
				if (!values.birthdate) {
					delete errors.birthdate;
				}
			}

			return errors;
		},
		onSubmit: async (values) => {
			console.log(values);
			setIsSubmitting(true);
			const contactBody: IContact = {
				name: values.name,
				secondName: values.secondName,
				documentNumber: values.documentNumber,
				personType:
					values.personTypeId == 1
						? EPersonType.NaturalPerson
						: EPersonType.LegalPerson,
				phone: values.phone,
				email: values.email,
			};
			if (values.personTypeId == 1) {
				contactBody.gender = values.gender;
				contactBody.birthdate = values.birthdate;
			}
			if (customer?.id) {
				await updateCustomer(Number(customer?.id), contactBody);
			} else {
				await addCustomer(contactBody);
			}
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			secondName: Yup.string().required(),
			email: Yup.string()
				.email('Informe um e-mail válido')
				.max(255)
				.required('Informe o e-mail'),
			documentNumber: Yup.string().required(),
			address: Yup.string().nullable(),
			gender: Yup.string().nullable(),
			phone: Yup.string()
				.required('Informe o número do celular')
				.min(11, 'Informe um número de celular válido')
				.max(11, 'Informe um número de celular válido'),
			birthdate: Yup.string().nullable(),
		}),
	});

	function addCustomer(contact: IContact) {
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
					router.push('/customers');
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

	function updateCustomer(id: number, contact: IContact) {
		toast.configure();
		setIsSubmitting(true);
		updateContactInfo(id, contact).then(
			async (response) => {
				setIsSubmitting(false);
				if (response.status == 200 && response.data) {
					toast.success('Dados alterados com sucesso!', {
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
				toast.error('Erro ao alterar dados!', {
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
					<Link passHref href='/customers'>
						<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<ArrowBack />
							Clientes
						</Typography>
					</Link>
				</Box>
				<Typography sx={{ mb: 3 }} variant='h4'>
					{customer?.id ? 'Editar' : 'Adicionar'} cliente
				</Typography>
				<form noValidate onSubmit={formik.handleSubmit}>
					<Card>
						<CardHeader title='Dados pessoais' />
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={12} xs={12}>
									<FormControl disabled={customer?.id ? true : false}>
										<FormLabel>Tipo de cadastro</FormLabel>
										<RadioGroup
											row
											name='row-radio-buttons-group'
											color='primary'
											onChange={(e) =>
												formik.setFieldValue('personTypeId', e.target.value)
											}
											value={formik.values.personTypeId}>
											<FormControlLabel
												value='1'
												control={<Radio />}
												label='Pessoa Física'
											/>
											<FormControlLabel
												value='2'
												control={<Radio />}
												label='Pessoa Jurídica'
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item md={formik.values.personTypeId == 1 ? 3 : 4} sm={6} xs={12}>
									<TextField
										disabled={customer?.id ? true : false}
										required
										fullWidth
										id='documentNumber'
										label={formik.values.personTypeId == 1 ? 'CPF' : 'CNPJ'}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.documentNumber}
										variant='outlined'
										name='documentNumber'
										placeholder={
											formik.values.personTypeId == 1 ? 'Digite o CPF' : 'Digite o CNPJ'
										}
										autoComplete='documentNumber'
										error={Boolean(
											formik.touched.documentNumber && formik.errors.documentNumber
										)}
										helperText={
											formik.touched.documentNumber && formik.errors.documentNumber
										}></TextField>
								</Grid>
								<Grid item md={formik.values.personTypeId == 1 ? 3 : 8} sm={6} xs={12}>
									<TextField
										fullWidth
										label={formik.values.personTypeId == 1 ? 'Nome' : 'Razão Social'}
										name='name'
										onChange={formik.handleChange}
										required
										value={formik.values.name}
										placeholder={
											formik.values.personTypeId == 1
												? 'Digite o nome'
												: 'Digite a razão social'
										}
										autoComplete='name'
										error={Boolean(formik.touched.name && formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} sm={12} xs={12}>
									<TextField
										fullWidth
										label={
											formik.values.personTypeId == 1 ? 'Sobrenome' : 'Nome Fantasia'
										}
										name='secondName'
										onChange={formik.handleChange}
										required
										value={formik.values.secondName}
										placeholder={
											formik.values.personTypeId == 1
												? 'Digite o sobrenome'
												: 'Digite o nome fantasia'
										}
										autoComplete='secondName'
										error={Boolean(formik.touched.secondName && formik.errors.secondName)}
										helperText={formik.touched.secondName && formik.errors.secondName}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={formik.values.personTypeId == 1 ? 5 : 6} sm={6} xs={12}>
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
										placeholder='Digite o e-mail'
										autoComplete='off'
										error={Boolean(formik.touched.email && formik.errors.email)}
										helperText={formik.touched.email && formik.errors.email}
									/>
								</Grid>
								<Grid item md={4} sm={6} xs={12}>
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
										placeholder='Digite o celular'
										autoComplete='phone'
										variant='outlined'
										error={Boolean(formik.touched.phone && formik.errors.phone)}
										helperText={formik.touched.phone && formik.errors.phone}
									/>
								</Grid>
								{formik.values.personTypeId == 1 && (
									<>
										<Grid item md={3} sm={6} xs={12}>
											<TextField
												fullWidth
												id='gender'
												label='Gênero'
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.gender}
												name='gender'
												placeholder='Selecione o gênero'
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
										<Grid item md={4} sm={4} xs={12}>
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
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										id='address'
										label='Endereço'
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.address}
										name='address'
										placeholder='Digite o endereço'
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
								Salvar cliente
							</LoadingButton>
						</Box>
					</Card>
				</form>
			</Container>
		</Box>
	);
}
