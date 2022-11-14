import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ICustomer } from '../../shared/interfaces/customer';
import { Pageable } from '../../shared/interfaces/pageable';
import { IProduct } from '../../shared/interfaces/product';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IInventoryMovementBody } from '../../shared/interfaces/inventory-movement';
import DataGridTable from '../data-grid-table';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import CurrencyFormat from 'react-currency-format';
import { getAllProducts } from '../../services/products.service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IInventoryProduct } from '../../shared/interfaces/inventory-product';
import { LoadingButton } from '@mui/lab';
import { EOperation } from '../../shared/enums/operation.enum';
import { registerInventoryMovement } from '../../services/inventory.service';
import { getAllCustomers } from '../../services/contacts.service';
import UserAvatar from '../avatar';
import { formatDocument } from '../../shared/helpers/format.helper';

export default function NewInventoryMovementForm() {
	const router = useRouter();
	const [products, setProducts] = useState<Pageable<IProduct>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [selectedProducts, setSelectedProducts] = useState<IInventoryProduct[]>(
		[]
	);
	const [contacts, setContacts] = useState<Pageable<ICustomer>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const rowsPerPage = [10, 25, 50];
	const [queryParams, setQueryParams] = useState<URLSearchParams>();

	const formik = useFormik({
		initialValues: {
			contactId: 0,
			operation: EOperation.Compra,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			if (!selectedProducts || !selectedProducts.length) {
				toast.warn('Selecione ao menos 1 produto para esta movimentação!', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
				return;
			}
			if (selectedProducts.some((p) => p.amount <= 0)) {
				toast.warn('Informe a quantidade para o(s) produto(s) selecionado(s)!', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
				return;
			}

			let inventoryMovement: IInventoryMovementBody = {
				operation: values.operation,
				products: selectedProducts,
			};
			if (values.contactId) {
				inventoryMovement.contactId = values.contactId;
			}

			console.log(inventoryMovement);
			handleAddMovement(inventoryMovement);
		},
		validationSchema: Yup.object({
			contactId: Yup.number(),
			operation: Yup.string().required('Selecione a operação'),
		}),
	});

	const handleAddMovement = async (
		inventoryMovement: IInventoryMovementBody
	) => {
		toast.configure();
		setIsSubmitting(true);
		registerInventoryMovement(inventoryMovement).then(
			async (response) => {
				setIsSubmitting(false);
				if (response.status == 200) {
					toast.success('Movimentação registrada com sucesso!', {
						position: 'top-center',
						autoClose: 3000,
						theme: 'colored',
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
					router.push('/inventory');
				}
			},
			(error) => {
				setIsSubmitting(false);
				toast.error('Erro ao registrar a movimentação!', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		);
	};

	const handleChangeAmount = (productId: number, value: string) => {
		const productsUpdated = selectedProducts?.map((p) => {
			if (p.productId === productId) {
				p.amount = Number(value);
				return p;
			}
			return p;
		});
		setSelectedProducts(productsUpdated);
		console.table(selectedProducts);
	};

	useEffect(() => {}, [selectedProducts]);

	const productColumns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 60, align: 'right' },
		{ field: 'name', headerName: 'Nome', width: 300 },
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
		{
			field: 'amount',
			headerName: 'Qtde.',
			width: 160,
			align: 'right',
			sortable: false,
			type: 'number',
			renderCell: ({ row }) => {
				return (
					<TextField
						type='number'
						disabled={!selectedProducts?.find((p) => p.productId === row.id)}
						placeholder='Quantidade'
						value={
							selectedProducts?.find((p) => p.productId === row.id)
								? selectedProducts?.find((p) => p.productId === row.id)?.amount
								: row.amount
						}
						onChange={(e) => handleChangeAmount(row.id, e.target.value)}
						size='small'></TextField>
				);
			},
		},
	];

	const contactColumns: GridColDef[] = [
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
	];

	const handleSelectedProducts = (products: GridSelectionModel) => {
		const selectedItems: IInventoryProduct[] = products.map((product) => {
			return {
				productId: product as number,
				amount: selectedProducts.find((p) => p.productId == product)
					? selectedProducts.find((p) => p.productId == product)?.amount!
					: 0,
			};
		});
		setSelectedProducts(selectedItems);
	};

	const handleSelectedContact = (contact: GridSelectionModel) => {
		const selectedContact = contact[0] as number;
		formik.setFieldValue('contactId', selectedContact);
	};

	useEffect(() => {
		getAllProducts(queryParams)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error: AxiosError) => {
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

		getAllCustomers()
			.then((response) => {
				setContacts(response.data);
			})
			.catch((error: AxiosError) => {
				toast.configure();
				toast.error('Erro ao buscar os clientes!', {
					position: 'top-center',
					autoClose: 3000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			});
	}, []);

	return (
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				width: '100%',
				maxWidth: 940,
				mx: 'auto',
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
					<Link passHref href='/inventory'>
						<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<ArrowBack />
							Inventário
						</Typography>
					</Link>
				</Box>
				<Typography sx={{ mb: 3 }} variant='h4'>
					Registrar movimentação
				</Typography>
				<form noValidate onSubmit={formik.handleSubmit}>
					<Card>
						<CardHeader title='Detalhes da movimentação' />
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={12} xs={12}>
									<FormControl>
										<FormLabel>Operação</FormLabel>
										<RadioGroup
											row
											name='row-radio-buttons-group'
											color='primary'
											onChange={(e) => formik.setFieldValue('operation', e.target.value)}
											value={formik.values.operation}>
											<FormControlLabel
												value='Compra'
												control={<Radio />}
												label='Compra'
											/>
											<FormControlLabel
												value='Produção'
												control={<Radio />}
												label='Produção'
											/>
											<FormControlLabel value='Venda' control={<Radio />} label='Venda' />
											<FormControlLabel
												value='Consumo'
												control={<Radio />}
												label='Consumo'
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
							</Grid>
							<Grid item md={12} xs={12} sx={{ mt: 2 }}>
								<FormLabel>Selecione um ou mais produtos</FormLabel>
								<DataGridTable
									checkboxSelection
									rows={products?.data}
									idProperty='id'
									height='350px'
									rowsPerPage={rowsPerPage}
									columns={productColumns}
									page={products?.page}
									size={products?.size}
									total={products?.total}
									onSelectionChange={(products) => handleSelectedProducts(products)}
									onGetQueryParams={(params) => setQueryParams(params)}
								/>
							</Grid>
							<Grid item md={12} xs={12} sx={{ mt: 2 }}>
								<FormLabel>Selecione o contato</FormLabel>
								<DataGridTable
									rows={contacts?.data}
									idProperty='id'
									height='350px'
									rowsPerPage={rowsPerPage}
									columns={contactColumns}
									page={contacts?.page}
									size={contacts?.size}
									total={contacts?.total}
									onSelectionChange={(contact) => handleSelectedContact(contact)}
									onGetQueryParams={(params) => setQueryParams(params)}
								/>
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
								Salvar movimentação
							</LoadingButton>
						</Box>
					</Card>
				</form>
			</Container>
		</Box>
	);
}
