import Head from 'next/head';
import {
	Avatar,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { ReactElement, useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { getAllCustomers } from '../../services/contacts.service';
import { Pageable } from '../../shared/interfaces/pageable';
import { Contact } from '../../shared/interfaces/contact';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAvatar from '../../components/avatar';
import { Customer } from '../../shared/interfaces/customer';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import Image from 'next/image';

export default function Customers() {
	const [contacts, setContacts] = useState<Pageable<Customer>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const params = new URLSearchParams();
	const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

	const [queryParams, setQueryParams] = useState<URLSearchParams>(params);

	function showDeleteDialog() {
		setIsDeleteModalShowing(true);
	}

	function handleCloseDeleteDialog() {
		setIsDeleteModalShowing(false);
	}

	function handleDeleteContact() {
		setIsDeleteModalShowing(false);
	}

	const columns: GridColDef[] = [
		{
			field: 'actions',
			width: 120,
			headerName: 'Ações',
			filterable: false,
			sortable: false,

			renderCell: (params) => {
				return (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Tooltip title='Editar'>
							<IconButton color='primary' aria-label='edit'>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title='Excluir'>
							<IconButton color='error' aria-label='delete' onClick={showDeleteDialog}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</Box>
				);
			},
		},
		{ field: 'id', headerName: 'ID', width: 60 },
		{
			field: 'imageUrl',
			headerName: 'Avatar',
			width: 70,
			renderCell: ({ row }) => {
				return (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<UserAvatar userName={row.name} width={32} height={32} fontSize={16} />
					</Box>
				);
			},
		},
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
		getCustomers();
	}, [queryParams]);

	function getCustomers() {
		console.log(queryParams);
		getAllCustomers(queryParams).then((response) => {
			console.log(response.data);
			setContacts(response.data);
		});
	}

	function handleSearch(query: string) {
		let params = queryParams;
		if (query != params.get('query')) {
			if (params.get('query')) params.set('query', query);
			else params.append('query', query);

			setQueryParams(params);
			getCustomers();
		}
	}

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
					<CustomerListToolbar onSearch={(query) => handleSearch(query)} />
					<Box sx={{ mt: 3 }}>
						<CustomerListResults
							rows={contacts?.data}
							columns={columns}
							page={contacts?.page}
							size={contacts?.size}
							total={contacts?.total}
							onGetQueryParams={(params) => setQueryParams(params)}
						/>
					</Box>
				</Container>

				<Dialog
					open={isDeleteModalShowing}
					onClose={handleCloseDeleteDialog}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>Confirmar exclusão</DialogTitle>
					<DialogContent sx={{ maxWidth: 480 }}>
						<Box sx={{ textAlign: 'center' }}>
							<Image
								alt='Exclusão de registro'
								src='/images/delete_vector.svg'
								width={160}
								height={120}
							/>
						</Box>
						<DialogContentText
							id='alert-dialog-description'
							sx={{ textAlign: 'center' }}>
							Deseja excluir esse cliente? Esta ação não poderá ser desfeita.
						</DialogContentText>
					</DialogContent>
					<DialogActions sx={{ pb: 3, justifyContent: 'center' }}>
						<Button onClick={handleCloseDeleteDialog} color='inherit'>
							Cancelar
						</Button>
						<Button
							onClick={handleDeleteContact}
							variant='contained'
							color='error'
							autoFocus>
							Excluir
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}

Customers.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
