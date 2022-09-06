import { ERole } from '../enums/role.enum';

export interface IUser {
	login: string;
	userId: string;
	accessToken: string;
	refreshToken: string;
	id?: number;
	role?: ERole;
	name?: string;
	surname?: string;
	gender?: string;
	documentNumber?: string;
	birthdate?: string;
	userStatus?: string;
	imageUrl?: string;
}
