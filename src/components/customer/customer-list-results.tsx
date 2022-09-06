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
import { Customer } from '../../shared/interfaces/customer';

export type ListProps<T> = {
	data: T[];
};

export const CustomerListResults = ({ data }: ListProps<Customer>) => {
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
									<TableCell>E-mail</TableCell>
									<TableCell>Telefone</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((customer: Customer) => (
									<TableRow hover key={customer.id}>
										<TableCell>
											<Box
												sx={{
													alignItems: 'center',
													display: 'flex',
												}}>
												<Avatar src={customer.imageUrl} sx={{ mr: 2 }}></Avatar>
												<Typography color='textPrimary' variant='body1'>
													{customer.name}
												</Typography>
											</Box>
										</TableCell>
										<TableCell>{customer.email}</TableCell>
										<TableCell>{customer.phone}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component='div'
				count={7}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};
