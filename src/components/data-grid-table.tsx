import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

export interface IDataGridProps {
	columns: GridColDef[];
	rows: any[];
	page: number;
	size: number;
	total: number;
}

export default function DataGridTable({ rows, size, columns }: IDataGridProps) {
	const [limit, setLimit] = useState(10);

	const handleLimitChange = (event: any) => {
		setLimit(event.target.value);
	};

	return (
		<Card sx={{ height: 'calc(100vh - 200px)' }}>
			<DataGrid pageSize={size} pagination rows={rows} columns={columns} />
		</Card>
	);
}
