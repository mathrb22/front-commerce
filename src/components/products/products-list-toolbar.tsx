import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

export const ProductsListToolbar = (props: any) => (
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
				<Button startIcon={<DownloadIcon fontSize='small' />} sx={{ mr: 1 }}>
					Exportar
				</Button>
				<Button color='primary' variant='contained'>
					Adicionar Produto
				</Button>
			</Box>
		</Box>
	</Box>
);
