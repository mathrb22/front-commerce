import { useContext, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	MenuItem,
	Grid,
	TextField,
	Skeleton,
	Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import {
	getContactInfo,
	updateContactInfo,
} from '../../services/contacts.service';
import { IContact } from '../../shared/interfaces/contact';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { genderList } from '../../shared/consts/genders';
import UserAvatar from '../avatar';
import { EPersonType } from '../../shared/enums/person-type.enum';

const states = [
	{ nome: 'Acre', sigla: 'AC' },
	{ nome: 'Alagoas', sigla: 'AL' },
	{ nome: 'Amapá', sigla: 'AP' },
	{ nome: 'Amazonas', sigla: 'AM' },
	{ nome: 'Bahia', sigla: 'BA' },
	{ nome: 'Ceará', sigla: 'CE' },
	{ nome: 'Distrito Federal', sigla: 'DF' },
	{ nome: 'Espírito Santo', sigla: 'ES' },
	{ nome: 'Goiás', sigla: 'GO' },
	{ nome: 'Maranhão', sigla: 'MA' },
	{ nome: 'Mato Grosso', sigla: 'MT' },
	{ nome: 'Mato Grosso do Sul', sigla: 'MS' },
	{ nome: 'Minas Gerais', sigla: 'MG' },
	{ nome: 'Pará', sigla: 'PA' },
	{ nome: 'Paraíba', sigla: 'PB' },
	{ nome: 'Paraná', sigla: 'PR' },
	{ nome: 'Pernambuco', sigla: 'PE' },
	{ nome: 'Piauí', sigla: 'PI' },
	{ nome: 'Rio de Janeiro', sigla: 'RJ' },
	{ nome: 'Rio Grande do Norte', sigla: 'RN' },
	{ nome: 'Rio Grande do Sul', sigla: 'RS' },
	{ nome: 'Rondônia', sigla: 'RO' },
	{ nome: 'Roraima', sigla: 'RR' },
	{ nome: 'Santa Catarina', sigla: 'SC' },
	{ nome: 'São Paulo', sigla: 'SP' },
	{ nome: 'Sergipe', sigla: 'SE' },
	{ nome: 'Tocantins', sigla: 'TO' },
];

interface AccountProfileProps {
	profile: IContact;
	isLoading: boolean;
}

export const AccountProfileDetails = ({
	profile,
	isLoading,
}: AccountProfileProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { getUserData } = useContext(AuthContext);

	function updateContact(id: number, contact: IContact) {
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
					await getUserData();
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

	const formik = useFormik({
		initialValues: {
			name: profile ? profile?.name : '',
			secondName: profile ? profile?.secondName : '',
			imageUrl: profile ? profile?.imageUrl : '',
			imageName: profile ? profile?.imageName : '',
			personType: profile ? profile?.personTypeId : 1,
			documentNumber: profile ? profile?.documentNumber : '',
			birthdate: profile && profile?.birthdate ? moment(profile?.birthdate) : null,
			address: profile ? profile?.address : '',
			gender: profile ? profile.gender : '',
			email: profile ? profile?.email : '',
			phone: profile ? profile?.phone : '',
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
			const contactBody: IContact = {
				name: values.name,
				secondName: values.secondName,
				documentNumber: values.documentNumber,
				personType:
					values.personType == 1
						? EPersonType.NaturalPerson
						: EPersonType.LegalPerson,
				phone: values.phone,
				email: values.email,
				address: values.address,
				imageUrl: values.imageUrl,
				imageName: values.imageName,
			};
			if (values.personType == 1) {
				contactBody.gender = values.gender;
				contactBody.birthdate = values.birthdate;
			}
			if (profile.id) await updateContact(profile.id, contactBody);
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

	function handleChangeUserImg(base64Img: string, imageName: string) {
		if (base64Img && imageName) {
			formik.setFieldValue('imageUrl', base64Img);
			formik.setFieldValue('imageName', imageName);
			console.log(formik.values.imageUrl);
			console.log(formik.values.imageName);
		}
	}

	return (
		<form noValidate onSubmit={formik.handleSubmit}>
			<Card
				sx={{
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
				}}>
				<CardContent>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}>
						{profile && !isLoading ? (
							<>
								<UserAvatar
									imageUrl={profile.imageUrl}
									onSelectImage={(base64Img, imageName) =>
										handleChangeUserImg(base64Img, imageName)
									}
									userName={profile.name}
									isLoading={false}
									width={72}
									fontSize={32}
									height={72}
									showUploadButton
								/>
								<Typography
									sx={{ mt: 2 }}
									color='textPrimary'
									gutterBottom
									variant='h5'
									textAlign='center'>
									{profile?.personTypeId == 1
										? profile?.name + ' ' + profile?.secondName
										: profile?.secondName}
								</Typography>
								<Typography color='textSecondary' variant='body2' textAlign='center'>
									{`${profile?.address ?? 'Endereço não informado'}`}
								</Typography>
							</>
						) : (
							<>
								<Skeleton
									animation='wave'
									variant='circular'
									width={64}
									height={64}
									sx={{ mb: 2 }}
								/>
								<Skeleton
									animation='wave'
									sx={{ mb: 2 }}
									variant='rectangular'
									width={210}
									height={50}
								/>
								<Skeleton
									animation='wave'
									variant='rectangular'
									width={210}
									height={24}
								/>
							</>
						)}
					</Box>
				</CardContent>
				<Divider />
			</Card>
			<Card
				sx={{
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				}}>
				<CardHeader
					subheader='Os dados a seguir podem ser editados'
					title='Dados pessoais'
				/>
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
								error={Boolean(formik.touched.secondName && formik.errors.secondName)}
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
												error={Boolean(formik.touched.birthdate && formik.errors.birthdate)}
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
	);
};
