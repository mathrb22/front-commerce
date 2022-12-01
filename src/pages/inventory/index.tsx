import { Box, Chip, Container, Tooltip } from '@mui/material';
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
import { GridColDef } from '@mui/x-data-grid';
import {
	formatDateTimeString,
	formatDateTimeStringToHowManyTimeAgo,
	formatNumberWithDigitGroup,
} from '../../shared/helpers/format.helper';
import { useRouter } from 'next/router';
export default function Inventory() {
	const router = useRouter();
	const [inventoryProducts, setInventoryProducts] = useState<
		Pageable<IInventoryProduct>
	>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const params = new URLSearchParams();

	const [queryParams, setQueryParams] = useState<URLSearchParams>(params);

	useEffect(() => {
		getInventory();
	}, [queryParams]);

	function getInventory() {
		getAllInventoryProducts(queryParams)
			.then((response) => {
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
		let params = queryParams;
		if (query != params.get('querys')) {
			if (params.get('querys')) {
				params.set('querys', query);
			} else {
				params.delete('querys');
				params.append('querys', query);
			}

			setQueryParams(params);
			getInventory();
		}
	}

	function handleAddToInventory() {
		router.push('inventory/movements/new');
	}

	const columns: GridColDef[] = [
		{
			field: 'productId',
			headerName: 'ID',
			width: 80,
			align: 'right',
		},
		{ field: 'name', headerName: 'Nome do produto', width: 500 },
		{
			field: 'amount',
			headerName: 'Estoque',
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
				<title>Inventário | Frontcommerce</title>
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
