import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IInventoryHistory } from '../../shared/interfaces/inventory-history';
import DataGridTable from '../data-grid-table';

export interface InventoryHistoryListResultsProps {
	columns: GridColDef[];
	rows: IInventoryHistory[];
	idProperty: string;
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export const InventoryHistoryListResults = ({
	rows,
	columns,
	idProperty = 'id',
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
				rows={rows}
				idProperty={idProperty}
				columns={columns}
				rowsPerPage={rowsPerPage}
				size={size}
				total={total}
				onGetQueryParams={(params) => onGetQueryParams(params)}
			/>
		</Card>
	);
};
