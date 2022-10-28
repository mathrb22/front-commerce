import { Card } from '@mui/material';
import { Product } from '../../shared/interfaces/product';
import { GridColDef } from '@mui/x-data-grid';
import DataGridTable from '../data-grid-table';

export interface ProductListResultsProps {
	columns: GridColDef[];
	rows: Product[];
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export const ProductListResults = ({
	rows,
	columns,
	page,
	size,
	total,
	onGetQueryParams,
}: ProductListResultsProps) => {
	const rowsPerPage = [10, 25, 50];

	return (
		<Card sx={{ height: 'calc(100vh - 200px)' }}>
			<DataGridTable
				page={page}
				rows={rows}
				columns={columns}
				rowsPerPage={rowsPerPage}
				size={size}
				total={total}
				onGetQueryParams={(params) => onGetQueryParams(params)}
			/>
		</Card>
	);
};
