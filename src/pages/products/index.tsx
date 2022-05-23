import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ReactElement } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ProductsListToolbar } from '../../components/products/products-list-toolbar';
import { ProductsListResults } from '../../components/products/products-list-results';
import { products } from '../../__mocks__/products';

const Products = () => (
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
			<Container maxWidth={false}>
				<ProductsListToolbar />
				<Box sx={{ mt: 3 }}>
					<ProductsListResults data={products} />
				</Box>
			</Container>
		</Box>
	</>
);
Products.getLayout = (page: ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default Products;
