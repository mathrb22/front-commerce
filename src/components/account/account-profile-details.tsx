import { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AccountProfileProps } from './account-profile';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';

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

export const AccountProfileDetails = ({ profile }: AccountProfileProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const formik = useFormik({
		initialValues: {
			name: profile ? profile?.name : '',
			secondName: profile ? profile?.secondName : '',
			birthDate: profile && profile?.birthdate ? moment(profile?.birthdate) : null,
			email: profile ? profile?.email : '',
			phone: profile ? profile?.phone : '',
		},
		validate: (values) => {
			const errors: any = {};
			if (!values.name) errors.name = 'Informe seu nome';
			if (!values.secondName) errors.secondName = 'Informe seu sobrenome';
			if (!values.birthDate) {
				errors.birthdate = 'Informe sua data de nascimento';
			}
			console.log(errors);
			return errors;
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log(values);
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			secondName: Yup.string().required(),
			email: Yup.string()
				.email('Informe um e-mail válido')
				.max(255)
				.required('Informe o e-mail'),
			gender: Yup.string(),
			phone: Yup.string()
				.required('Informe o número do celular')
				.min(11, 'Informe um número de celular válido')
				.max(11, 'Informe um número de celular válido'),
			birthdate: Yup.string(),
		}),
	});

	return (
		<form noValidate onSubmit={formik.handleSubmit}>
			<Card>
				<CardHeader
					subheader='Os dados a seguir podem ser editados'
					title='Dados pessoais'
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Nome'
								name='name'
								onChange={formik.handleChange}
								required
								value={formik.values.name}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Sobrenome'
								name='secondName'
								onChange={formik.handleChange}
								required
								value={formik.values.secondName}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='E-mail'
								name='email'
								onChange={formik.handleChange}
								required
								value={formik.values.email}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Telefone'
								name='phone'
								onChange={formik.handleChange}
								type='number'
								value={formik.values.phone}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<DatePicker
								label='Data de nascimento'
								onChange={(date) => {
									console.log(formik.errors);
									formik.setFieldValue('birthdate', date);
								}}
								onError={(error) => {
									formik.setFieldError('birthdate', error?.toString());
									console.log(formik.errors);
								}}
								value={formik.values.birthDate ? formik.values.birthDate : null}
								renderInput={(params) => (
									<TextField
										margin='normal'
										fullWidth
										id='birthDate'
										onBlur={formik.handleBlur}
										error={Boolean(formik.touched.birthDate && formik.errors.birthDate)}
										helperText={formik.touched.birthDate && formik.errors.birthDate}
										name='birthdate'
										variant='outlined'
										{...params}
									/>
								)}
							/>
						</Grid>
						{/*
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Selecione seu estado'
								name='state'
								onChange={handleChange}
								required
								select
								SelectProps={{ native: true }}
								value={values.state}
								variant='outlined'>
								<option key={''} value={''}>
									Selecionar
								</option>
								{states.map((option) => (
									<option key={option.sigla} value={option.sigla}>
										{option.nome}
									</option>
								))}
							</TextField>
						</Grid> */}
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
