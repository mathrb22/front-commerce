import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Avatar,
	Box,
	Card,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';
import { Product } from '../../shared/types/product';
import { format } from 'util';

export type ListProps<T> = {
	data: T[];
};

export const ProductsListResults = ({ data }: ListProps<Product>) => {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

	const handleLimitChange = (event: any) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event: any, newPage: any) => {
		setPage(newPage);
	};

	return (
		<Card>
			<PerfectScrollbar>
				<Box>
					<TableContainer sx={{ height: '70vh' }}>
						<Table stickyHeader sx={{ minWidth: 1000, overflow: 'scroll' }}>
							<TableHead>
								<TableRow>
									<TableCell>Nome</TableCell>
									<TableCell>Descrição</TableCell>
									<TableCell>Preço</TableCell>
									<TableCell>Qtde. Estoque</TableCell>
									<TableCell>Data de inclusão</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((product: Product) => (
									<TableRow hover key={product.id}>
										<TableCell sx={{ width: 360 }}>
											<Box
												sx={{
													alignItems: 'center',
													display: 'flex',
												}}>
												<Avatar
													variant='square'
													src={product.media}
													sx={{ mr: 2, width: 56, height: 56 }}></Avatar>
												<Typography color='textPrimary' variant='body1'>
													{product.name}
												</Typography>
											</Box>
										</TableCell>
										<TableCell>{product.description}</TableCell>
										<TableCell sx={{ minWidth: 120 }}>R$ {product.price}</TableCell>
										<TableCell sx={{ minWidth: 120 }}>{product.amount}</TableCell>
										<TableCell>{product.inclusionDate}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component='div'
				count={10}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};
