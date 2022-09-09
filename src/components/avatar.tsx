import { Avatar, Typography, AvatarProps } from '@mui/material';
import { ReactNode } from 'react';

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
			// return {
			// 	children: `${name[0]}`,
			// };
		}
	}

	return (
		<>
			{imageUrl ? (
				<Avatar
					alt='Avatar do usuário'
					src={imageUrl}
					sx={{
						width: width ?? 40,
						height: height ?? 40,
					}}
					{...props}
				/>
			) : (
				<Avatar
					alt='Avatar do usuário'
					sx={{
						width: width ?? 40,
						height: height ?? 40,
						bgcolor: stringToColor(userName),
					}}
					{...props}>
					{stringAvatar(userName)}
				</Avatar>
			)}
		</>
	);
}
