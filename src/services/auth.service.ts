import { AxiosResponse } from 'axios';
import {
	IAuthResponse,
	IRefreshBody,
	ISignUp,
	SignInCredentials,
} from '../contexts/AuthContext';
import { ERole } from '../shared/enums/role.enum';
import { api } from './api';

export async function signIn({
	login,
	password,
	role,
}: SignInCredentials): Promise<AxiosResponse<IAuthResponse>> {
	return new Promise((resolve, reject) => {
		api
			.post<SignInCredentials, AxiosResponse<IAuthResponse>>('auth/sign-in', {
				login,
				password,
				role: role ?? ERole.ADMIN,
			})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function signUp(
	signUpBody: ISignUp
): Promise<AxiosResponse<IAuthResponse>> {
	return new Promise((resolve, reject) => {
		api
			.post<ISignUp, AxiosResponse<IAuthResponse>>('auth/sign-up', signUpBody)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function refreshToken(
	refreshBody: IRefreshBody
): Promise<AxiosResponse<IAuthResponse>> {
	return new Promise((resolve, reject) => {
		api
			.post<IRefreshBody, AxiosResponse<IAuthResponse>>(
				'auth/refresh',
				refreshBody
			)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
