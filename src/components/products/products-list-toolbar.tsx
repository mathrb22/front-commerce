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
import { exportProducts } from '../../services/products.service';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';

interface ProductsListToolbarProps extends React.ComponentProps<typeof Box> {
	onSearch: (query: string) => void;
	onAdd: () => void;
}

export const ProductsListToolbar = ({
	onSearch,
	onAdd,
	...props
}: ProductsListToolbarProps) => {
	async function exportData() {
		exportProducts().then(
			(response) => {
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
					Produtos
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
						sx={{ backgroundColor: 'white', mr: 1, mb: 2 }}
						placeholder='Pesquisar produtos'
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
						startIcon={<AddIcon />}>
						Adicionar Produto
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
