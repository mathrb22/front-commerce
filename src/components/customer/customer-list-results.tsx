import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';

export type ListProps<T> = {
	data: T[];
};

export const CustomerListResults = () => {
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
				<Box sx={{ minWidth: 1050 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nome</TableCell>
								<TableCell>E-mail</TableCell>
								<TableCell>Localização</TableCell>
								<TableCell>Telefone</TableCell>
								<TableCell>Data de registro</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow hover>
								<TableCell align='center' variant='body'>
								</TableCell>
								<TableCell align='center' variant='body'>
								</TableCell>
								<TableCell align='center' variant='body'>
									<Typography>Nenhum cliente encontrado</Typography>
								</TableCell>
								<TableCell align='center' variant='body'>
								</TableCell>
								<TableCell align='center' variant='body'>
								</TableCell>
							</TableRow>
							{/* {data.map((customer: Customer) => (
								<TableRow hover key={customer.id}>
									<TableCell>
										<Box
											sx={{
												alignItems: 'center',
												display: 'flex',
											}}>
											<Avatar src={customer.avatarUrl} sx={{ mr: 2 }}></Avatar>
											<Typography color='textPrimary' variant='body1'>
												{customer.name}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{customer.email}</TableCell>
									<TableCell>
										{`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
									</TableCell>
									<TableCell>{customer.phone}</TableCell>
									<TableCell>{format(customer.createdAt, 'dd/MM/yyyy')}</TableCell>
								</TableRow>
							))} */}
						</TableBody>
					</Table>
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
