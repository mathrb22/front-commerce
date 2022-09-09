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
}

export const CustomerListResults = ({
	rows,
	columns,
	page,
	size,
	total,
}: CustomerListResultsProps) => {
	return (
		<DataGridTable
			page={page}
			rows={rows}
			columns={columns}
			size={size}
			total={total}
		/>
	);
};
