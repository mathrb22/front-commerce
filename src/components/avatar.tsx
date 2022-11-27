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
import { ReactNode, useState } from 'react';

export interface UserAvatarProps extends AvatarProps {
	imageUrl?: string;
	width?: number;
	height?: number;
	fontSize?: number;
	backgroundColor?: string;
	userName?: string;
	showUploadButton?: boolean;
	isLoading?: boolean;
	onSelectImage?: (base64Img: string, imageName: string) => void;
}

export default function UserAvatar({
	imageUrl,
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
	const [userAvatar, setUserAvatar] = useState<string | undefined>(imageUrl);

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
		//get the input file with id avatarUpload and click it
		const fileInput = document.getElementById('avatarUpload');
		if (fileInput) {
			fileInput.click();
		}
	}

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (reader.result) {
					setUserAvatar(reader.result as string);
					if (onSelectImage) onSelectImage(reader.result as string, file.name);
				}
			};
			reader.readAsDataURL(file);
		}
	}

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
							accept='image/jpeg'
							type='file'
							onChange={(e) => handleFileChange(e)}
						/>
						<FileUpload fontSize='small' />
					</Button>
				</Tooltip>
			)}
		</Box>
	);
}
