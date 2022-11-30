import axios, { AxiosRequestConfig } from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { ERole } from '../shared/enums/role.enum';
import { StorageHelper } from '../shared/helpers/storage.helper';
import { IUser } from '../shared/interfaces/user';
import { signIn } from './auth.service';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function getUser(): IUser | undefined {
	const user = StorageHelper.getLoggedInUser();
	if (user) return user;
	return undefined;
}

function getAxiosRequestConfig() {
	var config: AxiosRequestConfig;
	var baseURL: string = process.env.NEXT_PUBLIC_API_URL
		? process.env.NEXT_PUBLIC_API_URL
		: 'https://localhost:44375';

	const user = getUser();
	if (user && user.accessToken) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}

	config = {
		baseURL: baseURL,
	};

	return config;
}

export const api = axios.create(getAxiosRequestConfig());

api.interceptors.request.use((config) => {
	const user = getUser();
	if (user && user.accessToken) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
	return config;
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error && error.response?.status === 401) {
			const user = getUser();
			if (user && user?.password) {
				const encryptedPassword = StorageHelper.decryptUsingAES256(user.password);
				signIn({
					login: user.login,
					password: encryptedPassword,
					role: ERole.ADMIN,
				}).then(async (response) => {
					if (response.data) {
						user.accessToken = response.data.accessToken;
						user.refreshToken = response.data.refreshToken;
						StorageHelper.setItem('frontcommerce.user', JSON.stringify(user));

						axios.defaults.headers.common[
							'Authorization'
						] = `Bearer ${user.accessToken}`;

						Router.push('/dashboard').then(() => {
							// window.location.reload();
							console.log('navegou pro dashboard');
						});
					}
				});
			}
		}
	}
);
