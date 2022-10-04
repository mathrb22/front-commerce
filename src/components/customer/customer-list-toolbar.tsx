import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Typography,
	Tooltip,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { exportCustomers } from '../../services/contacts.service';
import { toast } from 'react-toastify';

interface CustomerListToolbarProps extends React.ComponentProps<typeof Box> {
	onSearch: (query: string) => void;
	onAdd: () => void;
}

export const CustomerListToolbar = ({
	onSearch,
	onAdd,
	...props
}: CustomerListToolbarProps) => {
	async function exportData() {
		exportCustomers().then(
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
				toast.error('Erro ao exportar dados');
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
					Clientes
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
						sx={{ backgroundColor: 'white', borderRadius: '4px', mr: 1, mb: 2 }}
						placeholder='Pesquisar clientes'
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
					<Button color='primary' variant='contained' onClick={onAdd}>
						Adicionar Cliente
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
