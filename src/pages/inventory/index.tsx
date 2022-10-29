import { Box, Chip, Container, IconButton, Tooltip } from '@mui/material';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DashboardLayout } from '../../components/dashboard-layout';
import { InventoryListResults } from '../../components/inventory/inventory-list-results';
import { InventoryListToolbar } from '../../components/inventory/inventory-list-toolbar';
import { getAllInventoryProducts } from '../../services/inventory.service';
import { IInventoryProduct } from '../../shared/interfaces/inventory-product';
import { Pageable } from '../../shared/interfaces/pageable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridColDef } from '@mui/x-data-grid';
import {
	formatDateTimeString,
	formatDateTimeStringToHowManyTimeAgo,
	formatNumberWithDigitGroup,
} from '../../shared/helpers/format.helper';

export default function Inventory() {
	const [inventoryProducts, setInventoryProducts] = useState<
		Pageable<IInventoryProduct>
	>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [selectedInventoryProduct, setSelectedInventoryProduct] =
		useState<IInventoryProduct | null>();
	const [isDeletingInventoryProduct, setIsDeletingInventoryProduct] =
		useState<boolean>(false);
	const params = new URLSearchParams();
	const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

	const [queryParams, setQueryParams] = useState<URLSearchParams>(params);

	function showDeleteDialog(item: IInventoryProduct) {
		console.log(item);
		setSelectedInventoryProduct(item);
		setIsDeleteModalShowing(true);
	}

	function handleCloseDeleteDialog() {
		setIsDeleteModalShowing(false);
	}

	function handleDeleteFromInventory() {
		toast.configure();
		if (selectedInventoryProduct?.productId) {
			console.log(selectedInventoryProduct);
		}
	}

	useEffect(() => {
		getInventory();
	}, [queryParams]);

	function getInventory() {
		getAllInventoryProducts(queryParams)
			.then((response) => {
				console.log(response.data);
				setInventoryProducts(response.data);
			})
			.catch((error: AxiosError) => {
				//toast
				toast.configure();
				toast.error('Erro ao buscar os produtos do inventário!', {
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

	function handleSearch(query: string) {
		console.log(query);
		let params = queryParams;
		console.log(queryParams);
		console.log(params);
		if (query != params.get('query')) {
			if (params.get('query')) {
				params.set('query', query);
			} else {
				params.delete('query');
				params.append('query', query);
			}

			setQueryParams(params);
			console.log(params);
			console.log(queryParams);
			getInventory();
		}
	}

	function handleAddToInventory() {}

	function handleEditInventoryProduct(item: IInventoryProduct) {
		console.log(item);
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
								onClick={() => handleEditInventoryProduct(row)}>
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
		{ field: 'productId', headerName: 'ID do Produto', width: 130 },
		{ field: 'name', headerName: 'Nome do produto', width: 500 },
		{
			field: 'amount',
			headerName: 'Quantidade',
			width: 130,
			align: 'right',
			renderCell: ({ value }) => {
				return (
					<Chip
						label={formatNumberWithDigitGroup(value)}
						color='secondary'
						variant='filled'
						size='small'
					/>
				);
			},
		},
		{
			field: 'lastUpdate',
			headerName: 'Última atualização',
			width: 250,
			type: 'date',
			renderCell: ({ value }) => {
				return (
					<Tooltip title={formatDateTimeString(value)}>
						<span>{formatDateTimeStringToHowManyTimeAgo(value)}</span>
					</Tooltip>
				);
			},
		},
	];

	return (
		<>
			<Head>
				<title>Inventário</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 3,
				}}>
				<Container maxWidth={false} sx={{ px: 3 }}>
					<InventoryListToolbar
						onSearch={(query) => handleSearch(query)}
						onAdd={handleAddToInventory}
					/>
					<Box sx={{ mt: 3 }}>
						<InventoryListResults
							rows={inventoryProducts?.data}
							idProperty='productId'
							columns={columns}
							page={inventoryProducts?.page}
							size={inventoryProducts?.size}
							total={inventoryProducts?.total}
							onGetQueryParams={(params) => setQueryParams(params)}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
}

Inventory.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
