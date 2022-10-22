import Head from 'next/head';
import { ReactElement } from 'react-imask/dist/mixin';
import CustomerForm from '../../../components/customer/customer-form';
import { DashboardLayout } from '../../../components/dashboard-layout';
import ProductForm from '../../../components/products/product-form';

export default function AddProductPage() {
	return (
		<>
			<Head>
				<title>Adicionar produto</title>
			</Head>
			<ProductForm />
		</>
	);
}

AddProductPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
