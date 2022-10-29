import { useState, useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react-imask/dist/mixin';
import { DashboardLayout } from '../../../components/dashboard-layout';
import Link from 'next/link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import {
	getContactInfo,
	updateContactInfo,
} from '../../../services/contacts.service';
import { IContact } from '../../../shared/interfaces/contact';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { genderList } from '../../../shared/consts/genders';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { EPersonType } from '../../../shared/enums/person-type.enum';
import CustomerForm from '../../../components/customer/customer-form';

export default function EditCustomerPage() {
	const router = useRouter();
	const { id } = router.query;
	const [customer, setCustomer] = useState<IContact | undefined>();

	async function getCustomerInfo(id: number) {
		getContactInfo(id).then((res) => {
			console.log(res);
			if (res && res.data) {
				console.log(res.data);
				console.log(customer);
				setCustomer(res.data);
				console.log(customer);
			}
		});
	}

	useEffect(() => {
		if (id) {
			console.log(id);
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
				<title>Editar cliente</title>
			</Head>
			<CustomerForm customer={customer} />
		</>
	);
}

EditCustomerPage.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);
