import { Card } from '@mui/material';
import { ICustomer } from '../../shared/interfaces/customer';
import { GridColDef } from '@mui/x-data-grid';
import DataGridTable from '../data-grid-table';

export interface CustomerListResultsProps {
	columns: GridColDef[];
	rows: ICustomer[];
	idProperty: string;
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export const CustomerListResults = ({
	rows,
	columns,
	idProperty = 'id',
	page,
	size,
	total,
	onGetQueryParams,
}: CustomerListResultsProps) => {
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
