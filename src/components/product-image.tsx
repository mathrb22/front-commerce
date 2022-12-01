import { FileUpload } from '@mui/icons-material';
import {
	Avatar,
	Typography,
	AvatarProps,
	Button,
	Box,
	Skeleton,
	Tooltip,
} from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';
import CropDialogPopup from './crop-dialog-popup';
import Compressor from 'compressorjs';
import { toast } from 'react-toastify';
import { dataURLtoFile } from '../shared/helpers/file.helper';
import { getContactImage } from '../services/contacts.service';
import { StorageHelper } from '../shared/helpers/storage.helper';
import Image, { ImageProps } from 'next/image';
import { getProductImage } from '../services/products.service';

export interface ProductImageProps {
	width?: number;
	height?: number;
	productId?: number;
	productName?: string;
	isLoading?: boolean;
}

export default function ProductImage({
	productId,
	productName,
	width,
	height,
	isLoading = true,
	...props
}: ProductImageProps) {
	const [productImage, setProductImage] = useState<string>(
		'/images/products/img-default.jpg'
	);

	useEffect(() => {
		if (productId) {
			getProductPhoto(productId);
		}
	}, []);

	const getProductPhoto = async (id?: number) => {
		getProductImage(id!).then((response) => {
			if (response && response.data.imageUrl) {
				const img = `
					data:image/png;base64,${response.data.imageUrl}`;
				setProductImage(img);
			}
		});
	};

	return (
		<Box sx={{ position: 'relative' }}>
			{isLoading ? (
				<Skeleton
					animation='wave'
					variant='rectangular'
					width={width ?? 80}
					height={width ?? 80}
				/>
			) : (
				<Image
					unoptimized
					alt='Avatar do usuário'
					width={width ?? 840}
					height={height ?? 700}
					src={productImage}></Image>
			)}
		</Box>
	);
}
