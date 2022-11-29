import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react-imask/dist/mixin';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { IProduct } from '../../../shared/interfaces/product';
import CustomerForm from '../../../components/customer/customer-form';
import { getProductInfo } from '../../../services/products.service';
import ProductForm from '../../../components/products/product-form';

export default function EditProductPage() {
	const router = useRouter();
	const { id } = router.query;
	const [product, setProduct] = useState<IProduct | undefined>();

	async function getProductDetails(id: number) {
		getProductInfo(id).then((res) => {
			if (res && res.data) {
				setProduct(res.data);
			}
		});
	}

	useEffect(() => {
		if (id) {
			if (typeof id === 'string' && id.match(/^[0-9]+$/)) {
				getProductDetails(Number(id));
			} else {
				router.push('/product/form');
			}
		}
	}, [id]);

	return (
		<>
			<Head>
				<title>Editar produto</title>
			</Head>
			<ProductForm product={product} />
		</>
	);
}

EditProductPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
