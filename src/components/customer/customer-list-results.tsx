import { useState } from 'react';
import { Card } from '@mui/material';
import { Customer } from '../../shared/interfaces/customer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DataGridTable from '../data-grid-table';

export interface CustomerListResultsProps {
	columns: GridColDef[];
	rows: Customer[];
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export const CustomerListResults = ({
	rows,
	columns,
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
				columns={columns}
				rowsPerPage={rowsPerPage}
				size={size}
				total={total}
				onGetQueryParams={(params) => onGetQueryParams(params)}
			/>
		</Card>
	);
};
