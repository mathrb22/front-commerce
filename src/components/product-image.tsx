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
	isContained?: boolean;
	showUploadButton?: boolean;
	onSelectImage?: (base64Img: string, imageName: string) => void;
}

export default function ProductImage({
	productId,
	productName,
	width,
	height,
	isLoading = true,
	isContained = false,
	showUploadButton,
	onSelectImage,
	...props
}: ProductImageProps) {
	const [productImage, setProductImage] = useState<string>(
		'/images/products/img-default.jpg'
	);
	const [selectedImage, setSelectedImage] = useState<string | undefined>();
	const [selectedImageName, setSelectedImageName] = useState<
		string | undefined
	>();
	const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

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

	function handleUpload() {
		const fileInput = document.getElementById('avatarUpload');
		if (fileInput) {
			fileInput.click();
		}
	}

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file.size > 2097152) {
			toast.configure();
			toast.warn('Selecione uma imagem de tamanho máximo de 2MB', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				theme: 'colored',
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}

		if (file) {
			new Compressor(file, {
				quality: 0.7,
				success: (compressedResult) => {
					if (compressedResult) {
						const reader = new FileReader();
						reader.onloadend = () => {
							if (reader.result) {
								setSelectedImage(reader.result as string);
								if (file.name) setSelectedImageName(file.name);
								setIsCropperDialogOpen(true);
							}
						};
						reader.readAsDataURL(compressedResult);
					}
				},
			});
		}
		// 	}
		// };
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{isContained ? (
				<Box sx={{ border: 1, borderColor: '#ddd', p: 2 }}>
					<Image
						unoptimized
						alt='Avatar do usuário'
						width={width ?? 840}
						height={height ?? 700}
						src={productImage}></Image>
				</Box>
			) : (
				<Image
					unoptimized
					alt='Avatar do usuário'
					width={width ?? 840}
					height={height ?? 700}
					src={productImage}></Image>
			)}

			{showUploadButton && (
				<Tooltip title='Alterar foto do produto'>
					<Button
						variant='contained'
						sx={{ mt: 3, mb: 2, display: 'flex', gap: 1, width: 200 }}
						color='primary'
						aria-label='upload picture'
						onClick={handleUpload}>
						<input
							id='avatarUpload'
							hidden
							accept='image/*'
							type='file'
							onChange={(e) => handleFileChange(e)}
						/>
						<FileUpload fontSize='small' />
						Atualizar foto
					</Button>
				</Tooltip>
			)}
			<CropDialogPopup
				title='Atualizar imagem do produto'
				open={isCropperDialogOpen}
				handleClose={() => setIsCropperDialogOpen(false)}
				image={selectedImage}
				getCroppedFile={(image) => {
					setProductImage(image);
					if (onSelectImage && selectedImage && selectedImageName) {
						onSelectImage(image, selectedImageName);
						setIsCropperDialogOpen(false);
					}
				}}
			/>
		</Box>
	);
}
