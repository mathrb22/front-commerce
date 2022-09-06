import { Avatar, Typography, AvatarProps } from '@mui/material';

export interface UserAvatarProps extends AvatarProps {
	imageUrl?: string;
	width?: number;
	height?: number;
	fontSize?: number;
	backgroundColor?: string;
	userName?: string;
}

export default function UserAvatar({
	imageUrl,
	userName,
	width,
	height,
	fontSize,
	backgroundColor,
	...props
}: UserAvatarProps) {
	return (
		<>
			{imageUrl ? (
				<Avatar
					alt='Avatar do usuário'
					src={imageUrl}
					sx={{
						mb: 2,
						width: width ?? 40,
						height: height ?? 40,
					}}
					{...props}
				/>
			) : (
				<Avatar
					alt='Avatar do usuário'
					sx={{
						mb: 2,
						width: width ?? 40,
						height: height ?? 40,
						backgroundColor: backgroundColor ?? 'primary.main',
					}}
					{...props}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 600, fontSize: fontSize ?? 32 }}>
						{userName && userName[0]}
					</Typography>
				</Avatar>
			)}
		</>
	);
}
