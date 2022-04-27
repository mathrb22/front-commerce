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

export const AccountProfileDetails = (props: any) => {
	const [values, setValues] = useState({
		firstName: 'José',
		lastName: 'Silva',
		email: 'admin@admin.com',
		phone: '',
		state: 'SP',
		country: 'Brasil',
	});

	const handleChange = (event: any) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form autoComplete='off' noValidate {...props}>
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
								name='firstName'
								onChange={handleChange}
								required
								value={values.firstName}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Sobrenome'
								name='lastName'
								onChange={handleChange}
								required
								value={values.lastName}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='E-mail'
								name='email'
								onChange={handleChange}
								required
								value={values.email}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Telefone'
								name='phone'
								onChange={handleChange}
								type='number'
								value={values.phone}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='País'
								name='country'
								onChange={handleChange}
								required
								value={values.country}
								variant='outlined'
							/>
						</Grid>
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
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2,
					}}>
					<Button color='primary' variant='contained'>
						Salvar alterações
					</Button>
				</Box>
			</Card>
		</form>
	);
};
