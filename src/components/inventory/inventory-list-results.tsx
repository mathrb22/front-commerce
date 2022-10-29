import { Card } from '@mui/material';
import { IInventoryProduct } from '../../shared/interfaces/inventory-product';
import { GridColDef } from '@mui/x-data-grid';
import DataGridTable from '../data-grid-table';

export interface InventoryListResultsProps {
	columns: GridColDef[];
	idProperty: string;
	rows: IInventoryProduct[];
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export const InventoryListResults = ({
	rows,
	idProperty = 'productId',
	columns,
	page,
	size,
	total,
	onGetQueryParams,
}: InventoryListResultsProps) => {
	const rowsPerPage = [10, 25, 50];

	return (
		<Card sx={{ height: 'calc(100vh - 200px)' }}>
			<DataGridTable
				page={page}
				idProperty={idProperty}
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
