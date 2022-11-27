import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CropperDemo from './cropper';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface CropDialogPopupProps {
	open: boolean;
	handleClose: () => void;
	image?: string;
	getCroppedFile: (img: string) => void;
}

export default function CropDialogPopup({
	open,
	image,
	handleClose,
	getCroppedFile,
}: CropDialogPopupProps) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>
					Atualizar imagem de perfil
					<IconButton
						aria-label='close'
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						<CropperDemo
							handleClose={handleClose}
							src={image}
							getCroppedFile={getCroppedFile}
						/>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
