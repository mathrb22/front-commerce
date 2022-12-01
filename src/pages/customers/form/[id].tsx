import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react-imask/dist/mixin';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { getContactInfo } from '../../../services/contacts.service';
import { IContact } from '../../../shared/interfaces/contact';
import CustomerForm from '../../../components/customer/customer-form';

export default function EditCustomerPage() {
	const router = useRouter();
	const { id } = router.query;
	const [customer, setCustomer] = useState<IContact | undefined>();

	async function getCustomerInfo(id: number) {
		getContactInfo(id).then((res) => {
			if (res && res.data) {
				setCustomer(res.data);
			}
		});
	}

	useEffect(() => {
		if (id) {
			if (typeof id === 'string' && id.match(/^[0-9]+$/)) {
				getCustomerInfo(Number(id));
			} else {
				router.push('/customers/form');
			}
		}
	}, [id]);

	return (
		<>
			<Head>
				<title>Editar cliente | Frontcommerce</title>
			</Head>
			<CustomerForm customer={customer} />
		</>
	);
}

EditCustomerPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
