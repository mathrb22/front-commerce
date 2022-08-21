export interface IUser {
	login: string;
	userId: string;
	accessToken: string;
	refreshToken: string;
	expires: string;
	id?: number;
	name?: string;
	surname?: string;
	gender?: string;
	documentNumber?: string;
	birthdate?: string;
	userStatus?: string;
	urlImage?: string;
}
