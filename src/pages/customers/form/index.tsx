import Head from 'next/head';
import { ReactElement } from 'react-imask/dist/mixin';
import CustomerForm from '../../../components/customer/customer-form';
import { DashboardLayout } from '../../../components/dashboard-layout';

export default function AddCustomerPage() {
	return (
		<>
			<Head>
				<title>Adicionar cliente</title>
			</Head>
			<CustomerForm />
		</>
	);
}

AddCustomerPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
