import { toast } from 'react-toastify';
import {
	Box,
	Button,
	TextField,
	InputAdornment,
	SvgIcon,
	Typography,
	Tooltip,
} from '@mui/material';
import { exportInventory } from '../../services/inventory.service';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

interface InventoryListToolbarProps extends React.ComponentProps<typeof Box> {
	onSearch: (query: string) => void;
	onAdd: () => void;
}

export const InventoryListToolbar = ({
	onSearch,
	onAdd,
	...props
}: InventoryListToolbarProps) => {
	async function exportData() {
		exportInventory().then(
			(response) => {
				console.log(response.data);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute(
					'download',
					response.headers['content-disposition'].split('filename=')[1].split(';')[0]
				);
				document.body.appendChild(link);
				link.click();
				link.parentNode?.removeChild(link);
			},
			(error) => {
				toast.error('Erro ao exportar dados', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		);
	}

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
					Inventário
				</Typography>
				<Box sx={{ m: 1 }}>
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
						placeholder='Pesquisar no inventário'
						variant='outlined'
					/>
					<Tooltip title='Exportar dados para Excel'>
						<Button
							startIcon={<DownloadIcon fontSize='small' />}
							sx={{ mr: 1 }}
							onClick={exportData}>
							Exportar
						</Button>
					</Tooltip>

					<Button
						color='primary'
						variant='contained'
						onClick={onAdd}
						disableElevation
						startIcon={<AddIcon />}>
						Registrar operação
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
