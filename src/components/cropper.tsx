import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';

import 'cropperjs/dist/cropper.css';
import { Tooltip } from '@mui/material';

export interface CropperProps {
	handleClose: () => void;
	src?: string;
	getCroppedFile: (img: string) => void;
}

export default function CropperDemo({ src, getCroppedFile }: CropperProps) {
	const cropperRef = useRef<HTMLImageElement>(null);
	const [loading, setLoading] = useState(true);
	const [scaleX, setScaleX] = useState(1);
	const [scaleY, setScaleY] = useState(1);

	const handleClick = () => {
		const imageElement: any = cropperRef?.current;
		const cropper: any = imageElement?.cropper;
		const img = cropper.getCroppedCanvas().toDataURL();
		getCroppedFile(img);
	};
	const rotate = () => {
		const imageElement: any = cropperRef?.current;
		const cropper: any = imageElement?.cropper;
		cropper.rotate(90);
	};
	const flip = (type: any) => {
		const imageElement: any = cropperRef?.current;
		const cropper: any = imageElement?.cropper;
		if (type === 'h') {
			cropper.scaleX(scaleX === 1 ? -1 : 1);
			setScaleX(scaleX === 1 ? -1 : 1);
		} else {
			cropper.scaleY(scaleY === 1 ? -1 : 1);
			setScaleY(scaleY === 1 ? -1 : 1);
		}
	};
	return (
		<>
			{loading && <Skeleton variant='rectangular' width={'100%'} height={400} />}
			<Box display={'flex'} justifyContent={'center'} mb={1}>
				<ButtonGroup disableElevation variant='outlined'>
					<Tooltip title='Rotacionar' aria-label='Rotacionar'>
						<Button onClick={rotate}>
							<RotateRightIcon />
						</Button>
					</Tooltip>
					<Tooltip
						title='Inverter horizontalmente'
						aria-label='Inverter horizontalmente'>
						<Button onClick={() => flip('h')}>
							<FlipIcon />
						</Button>
					</Tooltip>
					<Tooltip
						title='Inverter verticalmente'
						aria-label='Inverter verticalmente'>
						<Button onClick={() => flip('v')}>
							<FlipIcon style={{ transform: 'rotate(90deg)' }} />
						</Button>
					</Tooltip>
				</ButtonGroup>
			</Box>

			<Cropper
				src={src}
				style={{ height: 400, width: 500 }}
				// Cropper.js options
				aspectRatio={1 / 1}
				initialAspectRatio={1 / 1}
				guides={true}
				viewMode={1}
				ready={() => {
					setLoading(false);
				}}
				ref={cropperRef}
			/>
			<Button
				sx={{
					float: 'right',
					mt: 2,
				}}
				onClick={handleClick}
				autoFocus
				color='success'
				variant='contained'>
				Salvar imagem
			</Button>
		</>
	);
}
