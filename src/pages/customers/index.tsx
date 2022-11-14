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
import {
	deleteContact,
	getAllCustomers,
} from '../../services/contacts.service';
import { Pageable } from '../../shared/interfaces/pageable';
import { IContact } from '../../shared/interfaces/contact';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAvatar from '../../components/avatar';
import { ICustomer } from '../../shared/interfaces/customer';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { LoadingButton } from '@mui/lab';
import {
	convertDateToLocaleDate,
	formatDocument,
	formatPhoneNumber,
} from '../../shared/helpers/format.helper';

export default function Customers() {
	const router = useRouter();
	const [customers, setCustomers] = useState<Pageable<ICustomer>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>();
	const [isDeletingCustomer, setIsDeletingCustomer] = useState<boolean>(false);
	const params = new URLSearchParams();
	const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

	const [queryParams, setQueryParams] = useState<URLSearchParams>(params);

	function showDeleteDialog(customer: ICustomer) {
		console.log(customer);
		setSelectedCustomer(customer);
		setIsDeleteModalShowing(true);
	}

	function handleCloseDeleteDialog() {
		setIsDeleteModalShowing(false);
	}

	function handleDeleteCustomer() {
		toast.configure();
		if (selectedCustomer?.id) {
			setIsDeletingCustomer(true);
			deleteContact(selectedCustomer?.id)
				.then((response) => {
					if (response.status == 200) {
						const deletedCustomer = customers.data.find(
							(customer) => customer.id == selectedCustomer?.id
						);
						if (deletedCustomer) {
							//remove the deleted customer from the list
							const newCustomers = customers.data.filter(
								(customer) => customer.id != deletedCustomer.id
							);
							setCustomers({
								...customers,
								data: newCustomers,
							});
							setIsDeletingCustomer(false);
							setIsDeleteModalShowing(false);
							setSelectedCustomer(null);
							toast.success('Cliente removido com sucesso!', {
								position: 'top-center',
								autoClose: 3000,
								theme: 'colored',
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
							});
						}
					}
				})
				.catch((error: AxiosError) => {
					setIsDeletingCustomer(false);
					setIsDeleteModalShowing(false);
					toast.error('Erro ao remover o cliente!', {
						position: 'top-center',
						autoClose: 3000,
						theme: 'colored',
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				});
		}
	}

	function handleEditCustomer(id: number) {
		router.push(`/customers/form/${id}`);
	}

	function handleAddCustomer() {
		router.push(`/customers/form`);
	}

	const columns: GridColDef[] = [
		{
			field: 'actions',
			width: 120,
			headerName: 'Ações',
			filterable: false,
			sortable: false,

			renderCell: ({ row }) => {
				return (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Tooltip title='Editar'>
							<IconButton
								color='primary'
								aria-label='edit'
								onClick={() => handleEditCustomer(row.id)}>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title='Excluir'>
							<IconButton
								color='error'
								aria-label='delete'
								onClick={() => showDeleteDialog(row)}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</Box>
				);
			},
		},
		{ field: 'id', headerName: 'ID', width: 60, align: 'right' },
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
						<UserAvatar
							userName={row.name}
							imageUrl={row.imageUrl}
							isLoading={false}
							width={32}
							height={32}
							fontSize={16}
						/>
					</Box>
				);
			},
		},
		{ field: 'name', headerName: 'Nome / Razão Social', width: 300 },
		{
			field: 'documentNumber',
			headerName: 'Documento',
			width: 180,
			renderCell: ({ value }) => {
				return formatDocument(value);
			},
		},
		{
			field: 'personType',
			headerName: 'Tipo',
			width: 120,
		},
		{
			field: 'birthDate',
			headerName: 'Data Nascimento',
			width: 180,
			renderCell: ({ value }) => {
				return convertDateToLocaleDate(value);
			},
		},
		{
			field: 'gender',
			headerName: 'Tipo',
			width: 100,
		},
		{ field: 'email', headerName: 'Email', width: 250 },
		{
			field: 'phone',
			headerName: 'Telefone',
			width: 150,
			renderCell: ({ value }) => formatPhoneNumber(value),
		},
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
		getAllCustomers(queryParams).then((response) => {
			setCustomers(response.data);
		});
	}

	function handleSearch(query: string) {
		let params = queryParams;
		if (query != params.get('query')) {
			if (params.get('query')) {
				params.set('query', query);
			} else {
				params.delete('query');
				params.append('query', query);
			}

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
				<Container maxWidth={false} sx={{ px: 3 }}>
					<CustomerListToolbar
						onSearch={(query) => handleSearch(query)}
						onAdd={handleAddCustomer}
					/>
					<Box sx={{ mt: 3 }}>
						<CustomerListResults
							rows={customers?.data}
							idProperty='id'
							columns={columns}
							page={customers?.page}
							size={customers?.size}
							total={customers?.total}
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

						<LoadingButton
							loading={isDeletingCustomer}
							onClick={handleDeleteCustomer}
							variant='contained'
							color='error'
							autoFocus>
							Excluir
						</LoadingButton>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}

Customers.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
