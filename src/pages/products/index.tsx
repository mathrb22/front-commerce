import Head from 'next/head';
import {
	Box,
	Button,
	Chip,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ProductsListToolbar } from '../../components/products/products-list-toolbar';
import { ProductListResults } from '../../components/products/products-list-results';
import { GridColDef } from '@mui/x-data-grid';
import { Pageable } from '../../shared/interfaces/pageable';
import { IProduct } from '../../shared/interfaces/product';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProduct, getAllProducts } from '../../services/products.service';
import {
	formatDateTimeString,
	formatDateTimeStringToHowManyTimeAgo,
} from '../../shared/helpers/format.helper';
import CurrencyFormat from 'react-currency-format';
import { LoadingButton } from '@mui/lab';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function Products() {
	const router = useRouter();
	const [products, setProducts] = useState<Pageable<IProduct>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();
	const [isDeletingProduct, setIsDeletingProduct] = useState<boolean>(false);
	const params = new URLSearchParams();
	const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

	const [queryParams, setQueryParams] = useState<URLSearchParams>(params);

	function showDeleteDialog(product: IProduct) {
		setSelectedProduct(product);
		setIsDeleteModalShowing(true);
	}

	function handleCloseDeleteDialog() {
		setIsDeleteModalShowing(false);
	}

	function handleDeleteProduct() {
		toast.configure();
		if (selectedProduct?.id) {
			setIsDeletingProduct(true);
			deleteProduct(selectedProduct?.id)
				.then((response) => {
					if (response.status == 200) {
						const deletedProduct = products.data.find(
							(product) => product.id == selectedProduct?.id
						);
						if (deletedProduct) {
							const newProducts = products.data.filter(
								(product) => product.id != deletedProduct.id
							);
							setProducts({
								...products,
								data: newProducts,
							});
							setIsDeletingProduct(false);
							setIsDeleteModalShowing(false);
							setSelectedProduct(null);
							toast.success('Produto removido com sucesso!', {
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
					setIsDeletingProduct(false);
					setIsDeleteModalShowing(false);
					toast.error('Erro ao remover o produto!', {
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

	function handleEditProduct(id: number) {
		router.push(`/products/form/${id}`);
	}

	function handleAddProduct() {
		router.push(`/products/form`);
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
								onClick={() => handleEditProduct(row.id)}>
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
		{ field: 'name', headerName: 'Nome', width: 300 },
		{ field: 'description', headerName: 'Descrição', width: 540 },
		{
			field: 'defaultMeansurement',
			headerName: 'Unidade de medida padrão',
			width: 200,
			renderCell: ({ value }) => {
				return (
					<Chip label={value} color='default' variant='outlined' size='small' />
				);
			},
		},
		{
			field: 'price',
			headerName: 'Preço',
			width: 140,
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
		// { field: 'createdBy', headerName: 'Criado por', width: 130 },
		{
			field: 'createdAt',
			headerName: 'Criado em',
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

	useEffect(() => {
		getProducts();
	}, [queryParams]);

	function getProducts() {
		getAllProducts(queryParams)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error: AxiosError) => {
				//toast
				toast.configure();
				toast.error('Erro ao buscar os produtos!', {
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
		if (query != params.get('query')) {
			if (params.get('query')) {
				params.set('query', query);
			} else {
				params.delete('query');
				params.append('query', query);
			}

			setQueryParams(params);
			getProducts();
		}
	}

	return (
		<>
			<Head>
				<title>Produtos</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 3,
				}}>
				<Container maxWidth={false} sx={{ px: 3 }}>
					<ProductsListToolbar
						onSearch={(query) => handleSearch(query)}
						onAdd={handleAddProduct}
					/>
					<Box sx={{ mt: 3 }}>
						<ProductListResults
							rows={products?.data}
							idProperty='id'
							columns={columns}
							page={products?.page}
							size={products?.size}
							total={products?.total}
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
							Deseja excluir esse produto? Esta ação não poderá ser desfeita.
						</DialogContentText>
					</DialogContent>
					<DialogActions sx={{ pb: 3, justifyContent: 'center' }}>
						<Button onClick={handleCloseDeleteDialog} color='inherit'>
							Cancelar
						</Button>

						<LoadingButton
							loading={isDeletingProduct}
							onClick={handleDeleteProduct}
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

Products.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
