import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react-imask/dist/mixin';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { getContactInfo } from '../../../services/contacts.service';
import { IContact } from '../../../shared/interfaces/contact';
import CustomerForm from '../../../components/customer/customer-form';
import { getAllInventoryHistory } from '../../../services/inventory.service';
import { Pageable } from '../../../shared/interfaces/pageable';
import { IInventoryHistory } from '../../../shared/interfaces/inventory-history';
import { Box, Container, Tooltip, Typography } from '@mui/material';
import {
	InventoryHistoryListToolbar,
	IOperationMenuItem,
} from '../../../components/history/inventory-history-list-toolbar';
import { InventoryHistoryListResults } from '../../../components/history/inventory-history-list-results';
import { AxiosError } from 'axios';
import { GridColDef } from '@mui/x-data-grid';
import CurrencyFormat from 'react-currency-format';
import {
	formatDateTimeString,
	formatDateTimeStringToHowManyTimeAgo,
} from '../../../shared/helpers/format.helper';
import { EOperation } from '../../../shared/enums/operation.enum';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';

export default function CustomerHistoryPage() {
	const router = useRouter();
	const { id } = router.query;
	const [customerHistory, setCustomerHistory] = useState<
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
	const [customer, setCustomer] = useState<IContact | undefined>();

	const [operations, setOperations] = useState<IOperationMenuItem[]>([]);

	const operationsList: IOperationMenuItem[] = [
		{ id: 1, operation: EOperation.Compra, label: 'Compra' },
		{ id: 2, operation: EOperation.Venda, label: 'Venda' },
	];

	const getCustomerHistory = () => {
		getAllInventoryHistory(queryParams)
			.then((response) => {
				setCustomerHistory(response.data);
			})
			.catch((error: AxiosError) => {
				//toast
				console.log(error);
			});
	};

	useEffect(() => {
		if (id && typeof id === 'string' && id.match(/^[0-9]+$/)) {
			getCustomerInfo(Number(id));
			handleFilter();
		}
	}, [id]);

	useEffect(() => {
		handleFilter();
	}, [queryParams]);

	async function getCustomerInfo(id: number) {
		getContactInfo(id).then((res) => {
			if (res && res.data) {
				setCustomer(res.data);
				if (res.data.personTypeId == 1) {
					setOperations([
						{
							id: 1,
							operation: EOperation.Venda,
							label: 'Venda',
						},
					]);
				} else {
					setOperations(operationsList);
				}
			}
		});
	}

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

		if (id && typeof id === 'string' && id.match(/^[0-9]+$/)) {
			if (params.get('contactId')) {
				params.set('contactId', id);
			} else {
				params.append('contactId', id);
			}
		}

		setQueryParams(params);
		getCustomerHistory();
	};

	const handleChangeMovement = (operation: string) => {
		handleFilter('', operation);
	};

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			width: 40,
			align: 'right',
		},
		{
			field: 'contact',
			width: 500,
			headerName:
				queryParams.get('operation') == 'Compra' ||
				queryParams.get('operation') == 'Producao'
					? 'Fornecedor'
					: 'Cliente',
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

	return (
		<>
			<Head>
				<title>Histórico do cliente</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
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
					<InventoryHistoryListToolbar
						pageTitle='Histórico do cliente'
						operations={operations}
						onSearch={(query) => handleFilter(query)}
						onFilterOperation={(op) => handleChangeMovement(op)}
					/>
					<Box sx={{ mt: 3 }}>
						<InventoryHistoryListResults
							rows={customerHistory?.data}
							idProperty='id'
							columns={columns}
							page={customerHistory?.page}
							size={customerHistory?.size}
							total={customerHistory?.total}
							onGetQueryParams={(params) => setQueryParams(params)}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
}

CustomerHistoryPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
