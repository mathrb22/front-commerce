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

export const CustomerListToolbar = (props: any) => (
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
				<Button startIcon={<DownloadIcon fontSize='small' />} sx={{ mr: 1 }}>
					Exportar
				</Button>
				<Button color='primary' variant='contained'>
					Adicionar Cliente
				</Button>
			</Box>
		</Box>
		<Box sx={{ mt: 3 }}>
			<Card>
				<CardContent>
					<Box sx={{ maxWidth: 500 }}>
						<TextField
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SvgIcon color='action' fontSize='small'>
											<SearchIcon />
										</SvgIcon>
									</InputAdornment>
								),
							}}
							placeholder='Pesquisar clientes'
							variant='outlined'
						/>
					</Box>
				</CardContent>
			</Card>
		</Box>
	</Box>
);
