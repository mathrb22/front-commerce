import { Card } from '@mui/material';
import {
	DataGrid,
	GridCallbackDetails,
	GridCellParams,
	GridColDef,
	GridSelectionModel,
	MuiEvent,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { NoContent } from './no-content';

export interface IDataGridProps {
	columns: GridColDef[];
	rows: any[];
	checkboxSelection?: boolean;
	idProperty: string;
	rowsPerPage: number[];
	page: number;
	height?: string;
	size: number;
	total: number;
	onGetQueryParams: (params: URLSearchParams) => void;
	onSelectionChange?: (selection: GridSelectionModel) => void;
}

export default function DataGridTable({
	columns,
	rows,
	checkboxSelection = false,
	idProperty = 'id',
	rowsPerPage = [10, 25, 50],
	height,
	page = 0,
	size = 10,
	total = 0,
	onGetQueryParams,
	onSelectionChange,
}: IDataGridProps) {
	const [pageNumber, setPageNumber] = useState<number>(page - 1);
	const [pageSize, setPageSize] = useState<number>(size);
	const params = new URLSearchParams();
	const [idPropertyName, setIdPropertyName] = useState(idProperty);
	// const [selectionModel, setSelectionModel] = useState<GridSelectionModel>();

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

	const handleSelection = (
		newSelectionModel: GridSelectionModel,
		details: GridCallbackDetails
	) => {
		if (newSelectionModel && onSelectionChange) {
			onSelectionChange(newSelectionModel);
		}
	};

	const handleCellClick = (cell: GridCellParams, event: MuiEvent) => {
		event.defaultMuiPrevented = cell.field === 'amount';
	};

	const handlePageSizeChange = (newPageSize: number) => {
		if (pageSize !== newPageSize) {
			size = newPageSize;
			setPageSize(newPageSize);
			getQueryParamsPagination();
		}
	};

	return (
		<Card sx={{ height: height ?? 'calc(100vh - 200px)' }}>
			<DataGrid
				checkboxSelection={checkboxSelection}
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
				onSelectionModelChange={(newSelectionModel, details) =>
					handleSelection(newSelectionModel, details)
				}
				onCellClick={(cell, event) => handleCellClick(cell, event)}
			/>
		</Card>
	);
}
