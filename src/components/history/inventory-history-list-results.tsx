import { Card } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridTable from '../data-grid-table';
import { IInventoryHistory } from '../../shared/interfaces/inventory-history';

export interface InventoryHistoryListResultsProps {
	columns: GridColDef[];
	idProperty: string;
	rows: IInventoryHistory[];
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export const InventoryHistoryListResults = ({
	rows,
	idProperty = 'productId',
	columns,
	page,
	size,
	total,
	onGetQueryParams,
}: InventoryHistoryListResultsProps) => {
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
