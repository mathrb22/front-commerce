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

export interface UserAvatarProps extends AvatarProps {
	imageUrl?: string;
	width?: number;
	height?: number;
	fontSize?: number;
	backgroundColor?: string;
	userId?: number;
	userName?: string;
	showUploadButton?: boolean;
	isLoading?: boolean;
	onSelectImage?: (base64Img: string, imageName: string) => void;
}

export default function UserAvatar({
	imageUrl,
	userId,
	userName,
	width,
	height,
	fontSize,
	backgroundColor,
	showUploadButton,
	isLoading = true,
	onSelectImage,
	...props
}: UserAvatarProps) {
	const [userAvatar, setUserAvatar] = useState<string | undefined>();
	const [selectedImage, setSelectedImage] = useState<string | undefined>();
	const [selectedImageName, setSelectedImageName] = useState<
		string | undefined
	>();
	const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

	function stringToColor(string: string | undefined) {
		if (!string) {
			return 'primary';
		}

		let hash = 0;
		let i;

		if (string && string.length > 0) {
			/* eslint-disable no-bitwise */
			for (i = 0; i < string.length; i += 1) {
				hash = string.charCodeAt(i) + ((hash << 5) - hash);
			}

			let color = '#';

			for (i = 0; i < 3; i += 1) {
				const value = (hash >> (i * 10)) & 0xff;
				color += `00${value.toString(16)}`.slice(-2);
			}
			/* eslint-enable no-bitwise */

			return color;
		}
	}

	function stringAvatar(name: string | undefined) {
		if (!name)
			return <Typography sx={{ fontSize: fontSize || 16 }}>?</Typography>;
		if (name && name.length > 0) {
			return (
				<Typography sx={{ fontSize: fontSize || 16 }}>{name.charAt(0)}</Typography>
			);
		}
	}

	function handleUpload() {
		const fileInput = document.getElementById('avatarUpload');
		if (fileInput) {
			fileInput.click();
		}
	}

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file.size > 1048576) {
			toast.configure();
			toast.warn('Selecione uma imagem de tamanho máximo de 1MB', {
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

		const img = new Image();
		img.src = window.URL.createObjectURL(file);
		img.onload = () => {
			const width = img.naturalWidth;
			const height = img.naturalHeight;
			window.URL.revokeObjectURL(img.src);
			if (width > 700 || height > 700) {
				toast.configure();
				toast.warn('Selecione uma imagem com no máximo 700x700px', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					theme: 'colored',
					pauseOnHover: true,
					draggable: true,
				});
				return;
			} else {
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
			}
		};
	}

	// async function prepareCroppedImage(croppedImage: string) {
	// 	if (croppedImage) {
	// 		console.log('before compression: ' + croppedImage.length);
	// 		const compressedFile = await dataURLtoFile(croppedImage, selectedImageName!);
	// 		//convert the croppedImage base64 string (dataURL) to File and return the image compressed:
	// 		new Compressor(compressedFile, {
	// 			quality: 0.7,
	// 			success: (compressedResult) => {
	// 				if (compressedResult) {
	// 					const reader = new FileReader();
	// 					reader.onloadend = () => {
	// 						if (reader.result) {
	// 							if (onSelectImage) {
	// 								const result = reader.result as string;
	// 								console.log('after compression: ' + result.length);
	// 								onSelectImage(reader.result as string, selectedImageName || 'avatar');
	// 							}
	// 						}
	// 					};
	// 					reader.readAsDataURL(compressedResult);
	// 				}
	// 			},
	// 		});
	// 	}
	// }

	useEffect(() => {
		console.log('useEffect');
		if (userId) {
			getUserImage(userId);
		}
	}, []);

	const getUserImage = async (id?: number) => {
		getContactImage(id!).then((response) => {
			if (response && response.data.imageUrl) {
				const avatar = `
					data:image/png;base64,${response.data.imageUrl}`;
				setUserAvatar(avatar);
			}
		});
	};

	return (
		<Box sx={{ position: 'relative' }}>
			{isLoading ? (
				<Skeleton
					animation='wave'
					variant='circular'
					width={width ?? 40}
					height={width ?? 40}
				/>
			) : (
				<Avatar
					alt='Avatar do usuário'
					sx={{
						width: width ?? 40,
						height: height ?? 40,
						bgcolor: !userAvatar ? stringToColor(userName) : null,
					}}
					{...props}
					src={userAvatar}>
					{!userAvatar && stringAvatar(userName)}
				</Avatar>
			)}
			{showUploadButton && (
				<Tooltip title='Alterar foto de perfil'>
					<Button
						variant='contained'
						sx={{
							position: 'absolute',
							bottom: -8,
							right: -8,
							py: '6px',
							px: '16px',
							minWidth: 14,
							width: 14,
							borderRadius: '50%',
							background: 'primary light',
						}}
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
					</Button>
				</Tooltip>
			)}
			<CropDialogPopup
				open={isCropperDialogOpen}
				handleClose={() => setIsCropperDialogOpen(false)}
				image={selectedImage}
				getCroppedFile={(image) => {
					setUserAvatar(image);
					if (onSelectImage && selectedImage && selectedImageName) {
						// prepareCroppedImage(image);
						onSelectImage(selectedImage, selectedImageName);
						setIsCropperDialogOpen(false);
					}
				}}
			/>
		</Box>
	);
}
