import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IInventoryHistory } from '../../shared/interfaces/inventory-history';

export interface InventoryHistoryListResultsProps {
	columns: GridColDef[];
	idProperty: string;
	rows: IInventoryHistory[];
}

export const InventoryHistoryListResults = ({
	rows,
	columns,
}: InventoryHistoryListResultsProps) => {
	return (
		<Card sx={{ height: 'calc(100vh - 200px)' }}>
			<DataGrid
				getRowId={(row: any) => {
					return row['productId'];
				}}
				rows={rows}
				columns={columns}
			/>
		</Card>
	);
};
