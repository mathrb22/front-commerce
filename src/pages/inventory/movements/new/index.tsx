import Head from 'next/head';
import { ReactElement } from 'react-imask/dist/mixin';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import NewInventoryMovementForm from '../../../../components/inventory/new-movement-form';

export default function NewInventoryMovementPage() {
	return (
		<>
			<Head>
				<title>Registrar movimentação | Frontcommerce</title>
			</Head>
			<NewInventoryMovementForm />
		</>
	);
}

NewInventoryMovementPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
