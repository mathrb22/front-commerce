import Head from 'next/head';
import { Box, Chip, Container, Tooltip } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { InventoryHistoryListResults } from '../../components/history/inventory-history-list-results';
import { ReactElement, useEffect, useState, useContext } from 'react';
import { Pageable } from '../../shared/interfaces/pageable';
import { IInventoryHistory } from '../../shared/interfaces/inventory-history';
import { GridColDef } from '@mui/x-data-grid';
import {
	formatDateTimeString,
	formatDateTimeStringToHowManyTimeAgo,
	formatNumberWithDigitGroup,
} from '../../shared/helpers/format.helper';
import { InventoryHistoryListToolbar } from '../../components/history/inventory-history-list-toolbar';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllInventoryHistory } from '../../services/inventory.service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import CurrencyFormat from 'react-currency-format';

export default function Dashboard() {
	const [inventoryHistory, setInventoryHistory] = useState<
		Pageable<IInventoryHistory>
	>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [queryParams, setQueryParams] = useState<URLSearchParams>(
		new URLSearchParams()
	);
	const { profileData } = useContext(AuthContext);
	const [contactId, setContactId] = useState<number | undefined>();

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			width: 40,
			align: 'right',
		},
		{
			field: 'productId',
			headerName: 'Cód. Produto',
			width: 100,
			align: 'right',
		},
		{ field: 'product', headerName: 'Nome do produto', width: 500 },
		{ field: 'amount', headerName: 'Quantidade', width: 100, align: 'right' },
		{
			field: 'totalPrice',
			headerName: 'Valor Total',
			width: 130,
			align: 'right',
			renderCell: ({ value }) => {
				return (
					<CurrencyFormat
						value={value}
						displayType={'text'}
						thousandSeparator={'.'}
						decimalSeparator={','}
						prefix={'R$ '}
						fixedDecimalScale
						decimalScale={2}
					/>
				);
			},
		},
		{ field: 'contact', 
		  width: 500,
		  headerName: queryParams.get('operation') == 'Compra' ||
					  queryParams.get('operation') == 'Producao' ?
		 		 	  'Fornecedor' : 'Cliente' 
		},
		{
			field: 'buyDate',
			headerName: 'Data da movimentação',
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

	const handleGetHistory = () => {
		getAllInventoryHistory(queryParams)
			.then((response) => {
				setInventoryHistory(response.data);
			})
			.catch((error: AxiosError) => {
				//toast
				toast.configure();
				toast.error('Erro ao buscar o histórico de movimentações!', {
					position: 'top-center',
					autoClose: 3000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			});
	};

	useEffect(() => {
		if (profileData.id) {
			setContactId(profileData.id);
			handleFilter('', 'Compra');
		}
	}, []);

	useEffect(() => {
		handleGetHistory();
	}, [queryParams]);

	const handleFilter = (query?: string, operation?: string) => {
		let params = queryParams;
		if (query) {
			params.append('query', query);
		} else {
			params.delete('query');
		}

		if (operation) {
			if (params.get('operation')) {
				params.set('operation', operation);
			} else {
				params.append('operation', operation);
			}
		} else {
			params.set('operation', 'Compra');
		}

		// if (contactId) {
		// 	params.append('contactId', contactId.toString());
		// }
		setQueryParams(params);
		handleGetHistory();
	};

	const handleChangeMovement = (operation: string) => {
		handleFilter('', operation);
	};

	return (
		<>
			<Head>
				<title>Dashboard | Frontcommerce</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 3,
				}}>
				<Container maxWidth={false} sx={{ px: 3 }}>
					<InventoryHistoryListToolbar
						onSearch={(query) => handleFilter(query)}
						onFilterOperation={(op) => handleChangeMovement(op)}
					/>
					<Box sx={{ mt: 3 }}>
						<InventoryHistoryListResults
							rows={inventoryHistory?.data}
							idProperty='id'
							columns={columns}
							page={inventoryHistory?.page}
							size={inventoryHistory?.size}
							total={inventoryHistory?.total}
							onGetQueryParams={(params) => setQueryParams(params)}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
}

Dashboard.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
