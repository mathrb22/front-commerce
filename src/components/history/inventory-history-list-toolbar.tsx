import {
	Box,
	TextField,
	Typography,
	MenuItem,
	Grid,
	InputAdornment,
	SvgIcon,
} from '@mui/material';
import { EOperation } from '../../shared/enums/operation.enum';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';

export interface IOperationMenuItem {
	id: number;
	operation: EOperation;
	label: string;
}

export const allOperationsList = [
	{ id: 1, operation: EOperation.Compra, label: 'Compra' },
	{ id: 2, operation: EOperation.Producao, label: 'Produção' },
	{ id: 3, operation: EOperation.Venda, label: 'Venda' },
	{ id: 4, operation: EOperation.Consumo, label: 'Consumo' },
];

interface InventoryHistoryListToolbarProps
	extends React.ComponentProps<typeof Box> {
	onSearch: (query: string) => void;
	onFilterOperation: (operation: string) => void;
	pageTitle?: string;
	operations?: IOperationMenuItem[];
	initialOperation?: EOperation;
}

export const InventoryHistoryListToolbar = ({
	onFilterOperation,
	onSearch,
	pageTitle = 'Dashboard',
	operations = allOperationsList,
	initialOperation = EOperation.Compra,
	...props
}: InventoryHistoryListToolbarProps) => {
	const formik = useFormik({
		initialValues: {
			operation: initialOperation,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {},
		validationSchema: Yup.object({
			operation: Yup.string().required('Selecione a operação'),
		}),
	});

	const handleChangeOperation = (operation: string) => {
		formik.setFieldValue('operation', operation);
		onFilterOperation(operation);
	};

	useEffect(() => {
		if (initialOperation) handleChangeOperation(initialOperation);
	}, []);

	return (
		<Box {...props}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					m: -1,
				}}>
				<Typography sx={{ m: 1 }} variant='h4'>
					{pageTitle}
				</Typography>
				<Box sx={{ m: 1, display: 'flex' }}>
					<Grid item md={5} sm={7} xs={12}>
						<TextField
							onChange={(event) => onSearch(event.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<SvgIcon color='action' fontSize='small'>
											<SearchIcon />
										</SvgIcon>
									</InputAdornment>
								),
							}}
							sx={{ backgroundColor: 'white', borderRadius: '4px', mr: 1 }}
							placeholder='Pesquisar histórico'
							variant='outlined'
						/>
					</Grid>
					<Grid item md={5} sm={7} xs={12}>
						<TextField
							sx={{
								background: '#fff',
								borderRadius: 1,
								minWidth: 150,
							}}
							fullWidth
							id='operation'
							label='Operação'
							name='operation'
							onChange={(e) => handleChangeOperation(e.target.value)}
							onBlur={formik.handleBlur}
							value={formik.values.operation}
							placeholder='Filtre pelo tipo da operação'
							select
							variant='outlined'>
							<MenuItem value='Compra'>Selecionar</MenuItem>
							{operations.map((op) => (
								<MenuItem key={op.id} value={op.operation}>
									{op.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};
