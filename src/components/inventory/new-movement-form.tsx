import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
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
import {
	IInventoryProduct,
	IProductMovementBody,
} from '../../shared/interfaces/inventory-product';
import { LoadingButton } from '@mui/lab';
import { EOperation } from '../../shared/enums/operation.enum';
import {
	getAllInventoryProducts,
	registerInventoryMovement,
} from '../../services/inventory.service';
import { getAllCustomers } from '../../services/contacts.service';
import UserAvatar from '../avatar';
import {
	formatDocument,
	formatNumberWithDigitGroup,
	formatPhoneNumber,
} from '../../shared/helpers/format.helper';

export default function NewInventoryMovementForm() {
	const router = useRouter();
	const [products, setProducts] = useState<Pageable<IProduct>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [selectedProducts, setSelectedProducts] = useState<
		IProductMovementBody[]
	>([]);
	const [inventoryItems, setInventoryItems] = useState<
		Pageable<IInventoryProduct>
	>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});

	const [contacts, setContacts] = useState<Pageable<ICustomer>>({
		data: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const rowsPerPage = [10, 25, 50];
	const [productQueryParams, setProductQueryParams] =
		useState<URLSearchParams>();
	const [contactQueryParams, setContactQueryParams] = useState<URLSearchParams>(
		new URLSearchParams()
	);

	const formik = useFormik({
		initialValues: {
			contactId: 0,
			operation: EOperation.Compra,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			console.log(selectedProducts);
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
			if (selectedProducts.some((p) => !p.amount)) {
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

			if (
				(values.operation == EOperation.Compra ||
					values.operation == EOperation.Venda) &&
				values.contactId === 0
			) {
				toast.warn('Selecione o cliente da movimentação!', {
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
		registerInventoryMovement(inventoryMovement)
			.then(
				async (response) => {
					setIsSubmitting(false);
					if (response && response.status == 200) {
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
				}
			)
			.catch((err) => {
				setIsSubmitting(false);
			});
	};

	const handleChangeQuantity = (productId: number, value: string) => {
		const productsUpdated = selectedProducts?.map((p) => {
			if (p.productId === productId) {
				p.amount = Number(value);
				return p;
			}
			return p;
		});
		setSelectedProducts(productsUpdated);
	};

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
			headerName: 'Estoque',
			width: 120,
			align: 'right',
			renderCell: ({ row }) => {
				return (
					<Chip
						label={formatNumberWithDigitGroup(row.amount ? row.amount : 0)}
						color='secondary'
						variant='filled'
						size='small'
					/>
				);
			},
		},
		{
			field: 'quantity',
			headerName: 'Qtde.',
			width: 130,
			align: 'right',
			sortable: false,
			type: 'number',
			renderCell: ({ row }) => {
				return (
					<TextField
						type='number'
						InputProps={{
							inputProps: {
								min: 0,
								max:
									formik.values.operation == EOperation.Venda ||
									formik.values.operation == EOperation.Consumo
										? row.amount
										: undefined,
							},
						}}
						disabled={!selectedProducts?.find((p) => p.productId === row.id)}
						placeholder='Qtde.'
						value={row.quantity}
						onChange={(e) => handleChangeQuantity(row.id, e.target.value)}
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
							userId={row.id}
							userName={row.name}
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
		{ field: 'email', headerName: 'Email', width: 250 },
		{
			field: 'phone',
			headerName: 'Telefone',
			width: 150,
			renderCell: ({ value }) => formatPhoneNumber(value),
		},
	];

	const handleSelectedProducts = (products: GridSelectionModel) => {
		const selectedItems: IProductMovementBody[] = products.map((product) => {
			return {
				productId: product as number,
				amount: selectedProducts.find((p) => p.productId == product)?.amount!,
			};
		});
		setSelectedProducts(selectedItems);
	};

	const handleSelectedContact = (contact: GridSelectionModel) => {
		const selectedContact = contact[0] as number;
		formik.setFieldValue('contactId', selectedContact);
	};

	useEffect(() => {
		if (
			formik.values.operation == EOperation.Compra ||
			formik.values.operation == EOperation.Venda
		) {
			handleContactsQuery();
		}
	}, [formik.values.operation]);

	useEffect(() => {
		getProductsList();
	}, [productQueryParams]);

	useEffect(() => {
		getContacts();
	}, [contactQueryParams]);

	const getProductsList = () => {
		getAllProducts(productQueryParams)
			.then((response) => {
				setProducts(response.data);
				getInventoryItems();
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
	};

	const getInventoryItems = () => {
		getAllInventoryProducts()
			.then((response) => {
				setInventoryItems(response.data);
				// setProductStockAmount();
			})
			.catch((error: AxiosError) => {
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
	};

	const getContacts = () => {
		getAllCustomers(contactQueryParams)
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
	};

	const handleContactsQuery = (params?: URLSearchParams) => {
		if (!params) params = contactQueryParams;
		if (formik.values.operation == EOperation.Compra) {
			if (params.get('querys')) {
				params.set('querys', 'Pessoa Juridica');
			} else {
				params.append('querys', 'Pessoa Juridica');
			}
		} else {
			params.delete('querys');
		}
		setContactQueryParams(params);
		getContacts();
	};

	const handleChangeOperation = async (operation: string) => {
		await formik.setFieldValue('operation', operation, true);
		//clear the quantity of the selectedProducts (set to 0)

		// const newProducts: IProduct[] = products.data.map((product) => {
		// 	selectedProducts.forEach((p) => {
		// 		if (p.productId == product.id) {
		// 			product.quantity = 0;
		// 		}
		// 		return product;
		// 	});
		// });

		// const productsPageable: Pageable<IProduct> = {
		// 	data: newProducts,
		// 	page: products.page,
		// 	size: products.size,
		// 	total: products.total,
		// };
		// setProducts(productsPageable);

		const newSelectedProducts = selectedProducts.map((product) => {
			return { ...product, amount: 0 };
		});
		setSelectedProducts(newSelectedProducts);
	};

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
											onChange={(e) => handleChangeOperation(e.target.value)}
											onBlur={formik.handleBlur}
											value={formik.values.operation}>
											<FormControlLabel
												value='Compra'
												control={<Radio />}
												label='Compra'
											/>
											<FormControlLabel
												value='Producao'
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
									height='400px'
									rowsPerPage={rowsPerPage}
									columns={productColumns}
									page={products?.page}
									size={products?.size}
									total={products?.total}
									onSelectionChange={(products) => handleSelectedProducts(products)}
									onGetQueryParams={(params) => setProductQueryParams(params)}
								/>
							</Grid>
							{formik.values.operation == 'Compra' ||
							formik.values.operation == 'Venda' ? (
								<Grid item md={12} xs={12} sx={{ mt: 2 }}>
									<FormLabel>Selecione o contato</FormLabel>
									<DataGridTable
										rows={contacts?.data}
										idProperty='id'
										height='400px'
										rowsPerPage={rowsPerPage}
										columns={contactColumns}
										page={contacts?.page}
										size={contacts?.size}
										total={contacts?.total}
										onSelectionChange={(contact) => handleSelectedContact(contact)}
										onGetQueryParams={(params) => {
											handleContactsQuery(params);
										}}
									/>
								</Grid>
							) : null}
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
