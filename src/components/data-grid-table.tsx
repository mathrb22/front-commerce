import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { NoContent } from './no-content';

export interface IDataGridProps {
	columns: GridColDef[];
	rows: any[];
	idProperty: string;
	rowsPerPage: number[];
	page: number;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
}

export default function DataGridTable({
	columns,
	rows,
	idProperty = 'id',
	rowsPerPage = [10, 25, 50],
	page = 0,
	size = 10,
	total = 0,
	onGetQueryParams,
}: IDataGridProps) {
	const [pageNumber, setPageNumber] = useState<number>(page - 1);
	const [pageSize, setPageSize] = useState<number>(size);
	const params = new URLSearchParams();
	const [idPropertyName, setIdPropertyName] = useState(idProperty);

	useEffect(() => {}, [pageSize, pageNumber, idPropertyName]);

	function getQueryParamsPagination() {
		params.append('page', page.toString());

		params.append('size', size.toString());
		onGetQueryParams(params);
	}

	const handlePageChange = (newPage: number) => {
		if (pageNumber !== newPage) {
			if (newPage === 0) {
				page = 1;
			} else {
				page = newPage + 1;
			}
			setPageNumber(newPage);
			getQueryParamsPagination();
		}
	};

	const handlePageSizeChange = (newPageSize: number) => {
		if (pageSize !== newPageSize) {
			size = newPageSize;
			console.log('pageSizeChange', newPageSize);
			setPageSize(newPageSize);
			getQueryParamsPagination();
		}
	};

	return (
		<Card sx={{ height: 'calc(100vh - 200px)' }}>
			<DataGrid
				initialState={{
					pagination: {
						page: pageNumber,
						pageSize: pageSize,
					},
				}}
				components={{
					NoRowsOverlay: () => <NoContent />,
				}}
				paginationMode='server'
				pageSize={pageSize}
				onPageSizeChange={(newPage) => handlePageSizeChange(newPage)}
				pagination
				page={pageNumber}
				onPageChange={(newPage) => handlePageChange(newPage)}
				rows={rows}
				getRowId={(row: any) => {
					return row[idPropertyName];
				}}
				rowCount={total}
				rowsPerPageOptions={rowsPerPage}
				columns={columns}
			/>
		</Card>
	);
}
