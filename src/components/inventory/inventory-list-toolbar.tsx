import { useState } from 'react';
import { toast } from 'react-toastify';
import {
	Box,
	Button,
	TextField,
	InputAdornment,
	SvgIcon,
	Typography,
	Tooltip,
	styled,
	Menu,
	MenuProps,
	MenuItem,
} from '@mui/material';
import { exportInventory } from '../../services/inventory.service';
import { alpha } from '@material-ui/system';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import SellIcon from '@mui/icons-material/Sell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactoryIcon from '@mui/icons-material/Factory';
import { EOperation } from '../../shared/enums/operation.enum';

interface InventoryListToolbarProps extends React.ComponentProps<typeof Box> {
	onSearch: (query: string) => void;
	onAdd: () => void;
}

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export const InventoryListToolbar = ({
	onSearch,
	onAdd,
	...props
}: InventoryListToolbarProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const selectOperation = (operation: EOperation) => {
		console.log(operation);
		setAnchorEl(null);
	};

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
						sx={{ backgroundColor: 'white', borderRadius: '4px', mr: 1, mb: 2 }}
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
						onClick={handleClick}
						disableElevation
						endIcon={<KeyboardArrowDownIcon />}>
						Adicionar
					</Button>
					<StyledMenu
						id='demo-customized-menu'
						MenuListProps={{
							'aria-labelledby': 'demo-customized-button',
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}>
						<MenuItem onClick={() => selectOperation(EOperation.Venda)} disableRipple>
							<SellIcon />
							Venda
						</MenuItem>
						<MenuItem
							onClick={() => selectOperation(EOperation.Compra)}
							disableRipple>
							<ShoppingCartIcon />
							Compra
						</MenuItem>
						<MenuItem
							onClick={() => selectOperation(EOperation.Producao)}
							disableRipple>
							<FactoryIcon />
							Produção
						</MenuItem>
						<MenuItem
							onClick={() => selectOperation(EOperation.Consumo)}
							disableRipple>
							<InventoryIcon />
							Consumo
						</MenuItem>
					</StyledMenu>
				</Box>
			</Box>
		</Box>
	);
};
