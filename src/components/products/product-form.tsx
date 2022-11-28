import { useState } from 'react';
import { useRouter } from 'next/router';
import { IProduct } from '../../shared/interfaces/product';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { createProduct, updateProduct } from '../../services/products.service';

export interface ProductFormProps {
	product?: IProduct;
}

export default function ProductForm({ product }: ProductFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const descriptionCharacterLimit = 500;

	const formik = useFormik({
		initialValues: {
			name: product ? product?.name : '',
			description: product ? product?.description : '',
			defaultMeansurement: product ? product?.defaultMeansurement : '',
			price: product ? product?.price.toFixed(2) : Number(Number(0).toFixed(2)),
			createdBy: product ? product?.createdBy : '',
			createdAt: product ? product?.createdAt : '',
		},
		enableReinitialize: true,
		validate: (values) => {},
		validationSchema: Yup.object({
			name: Yup.string().required('Informe o nome do produto'),
			description: Yup.string()
				.required('Informe a descrição do produto')
				.max(500),
			defaultMeansurement: Yup.string().required(
				'Informe a unidade de medida padrão'
			),
			price: Yup.number()
				.required('Informe o preço do produto')
				.notOneOf([0], 'Informe o preço do produto'),
		}),
		onSubmit: async (values) => {
			setIsSubmitting(true);

			let productBody: IProduct = {
				name: values.name,
				description: values.description,
				defaultMeansurement: values.defaultMeansurement,
				price: Number(parseFloat(values.price.toString()).toFixed(2)),
			};

			if (product?.id) {
				setIsSubmitting(false);
				await updateProductInfo(Number(product?.id), productBody);
			} else {
				setIsSubmitting(false);
				await addProduct(productBody);
			}
		},
	});

	function addProduct(product: IProduct) {
		toast.configure();
		setIsSubmitting(true);
		createProduct(product).then(
			async (response) => {
				setIsSubmitting(false);
				if (response.status == 200 && response.data) {
					toast.success('Produto adicionado com sucesso!', {
						position: 'top-center',
						autoClose: 3000,
						theme: 'colored',
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
					router.push('/products');
				}
			},
			(error) => {
				setIsSubmitting(false);
				toast.error('Erro ao adicionar o produto. Tente novamente!', {
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
	}

	function updateProductInfo(id: number, product: IProduct) {
		toast.configure();
		setIsSubmitting(true);
		updateProduct(id, product).then(
			async (response) => {
				setIsSubmitting(false);
				if (response.status == 200 && response.data) {
					toast.success('Dados alterados com sucesso!', {
						position: 'top-center',
						autoClose: 3000,
						theme: 'colored',
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				}
			},
			(error) => {
				setIsSubmitting(false);
				toast.error('Erro ao alterar dados!', {
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
	}

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
					<Link passHref href='/products'>
						<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<ArrowBack />
							Produtos
						</Typography>
					</Link>
				</Box>
				<Typography sx={{ mb: 3 }} variant='h4'>
					{product?.id ? 'Editar' : 'Adicionar'} produto
				</Typography>
				<form noValidate onSubmit={formik.handleSubmit}>
					<Card>
						<CardHeader title='Informações do produto' />
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={12} xs={12}>
									<TextField
										fullWidth
										label='Nome'
										name='name'
										onChange={formik.handleChange}
										required
										value={formik.values.name}
										onBlur={formik.handleBlur}
										placeholder='Digite o nome do produto'
										autoComplete='name'
										error={Boolean(formik.touched.name && formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
										variant='outlined'></TextField>
								</Grid>
								<Grid item md={12} xs={12}>
									<TextField
										fullWidth
										multiline
										rows={4}
										inputProps={{
											maxlength: descriptionCharacterLimit,
										}}
										label='Descrição'
										name='description'
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										required
										value={formik.values.description}
										placeholder='Digite a descrição do produto'
										autoComplete='description'
										error={Boolean(
											formik.touched.description && formik.errors.description
										)}
										helperText={
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
												}}>
												<Typography sx={{ fontSize: 12 }}>
													{formik.touched.description && formik.errors.description}
												</Typography>
												<Typography sx={{ fontSize: 12 }}>
													{formik.values.description.length}/{descriptionCharacterLimit}
												</Typography>
											</Box>
										}
										variant='outlined'></TextField>
								</Grid>
								<Grid item md={4} sm={6} xs={12}>
									<TextField
										type='number'
										InputProps={{
											startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
										}}
										fullWidth
										label='Preço'
										name='price'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										required
										value={formik.values.price}
										placeholder='Digite o preço'
										autoComplete='price'
										error={Boolean(formik.touched.price && formik.errors.price)}
										helperText={formik.touched.price && formik.errors.price}
										variant='outlined'></TextField>
								</Grid>
								<Grid item md={5} sm={6} xs={12}>
									<TextField
										fullWidth
										label='Unidade de medida padrão'
										name='defaultMeansurement'
										onChange={formik.handleChange}
										required
										value={formik.values.defaultMeansurement}
										onBlur={formik.handleBlur}
										placeholder='Digite a unidade de medida padrão'
										autoComplete='defaultMeansurement'
										error={Boolean(
											formik.touched.defaultMeansurement &&
												formik.errors.defaultMeansurement
										)}
										helperText={
											formik.touched.defaultMeansurement &&
											formik.errors.defaultMeansurement
										}
										variant='outlined'></TextField>
								</Grid>
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
								Salvar produto
							</LoadingButton>
						</Box>
					</Card>
				</form>
			</Container>
		</Box>
	);
}
