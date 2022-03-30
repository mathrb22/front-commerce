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

export const ProductsListResults = () => {
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
								<TableCell>Descrição</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow hover>
								<TableCell align='center' variant='body'>
								</TableCell>
								<TableCell align='center' variant='body'>
									<Typography>Nenhum produto encontrado</Typography>
								</TableCell>
							</TableRow>
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
