import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { ReactElement, useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { getAllCustomers } from '../../services/contacts.service';
import { Pageable } from '../../shared/interfaces/pageable';
import { Contact } from '../../shared/interfaces/contact';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Customer } from '../../shared/interfaces/customer';
import { CustomerListResults } from '../../components/customer/customer-list-results';

export default function Customers() {
	const [contacts, setContacts] = useState<Pageable<Customer>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [query, setQuery] = useState<string | undefined>('');
	const params = new URLSearchParams();

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 60 },
		{ field: 'name', headerName: 'Nome / Razão Social', width: 300 },
		{ field: 'documentNumber', headerName: 'Documento', width: 140 },
		{
			field: 'personType',
			headerName: 'Tipo',
			width: 120,
		},
		{
			field: 'birthDate',
			headerName: 'Data Nascimento',
			width: 180,
			type: 'date',
		},
		{
			field: 'gender',
			headerName: 'Tipo',
			width: 100,
		},
		{ field: 'email', headerName: 'Email', width: 250 },
		{ field: 'phone', headerName: 'Telefone', width: 130 },
		{
			field: 'address',
			headerName: 'Endereço',
			width: 500,
		},
		{ field: 'createdAt', headerName: 'Criado em', width: 130 },
		{ field: 'updatedAt', headerName: 'Atualizado em', width: 130 },
	];

	useEffect(() => {
		getAllCustomers().then((response) => {
			console.log(response.data);
			setContacts(response.data);
			console.table(contacts?.data);
		});
	}, []);

	return (
		<>
			<Head>
				<title>Clientes</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 3,
				}}>
				<Container maxWidth={false}>
					<CustomerListToolbar />
					<Box sx={{ mt: 3 }}>
						<CustomerListResults
							rows={contacts?.data}
							columns={columns}
							page={contacts.page}
							size={contacts.size}
							total={contacts.total}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
}

Customers.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
