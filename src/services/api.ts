import axios, { AxiosRequestConfig } from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { ERole } from '../shared/enums/role.enum';
import { StoragerHelper } from '../shared/helpers/storage.helper';
import { IUser } from '../shared/interfaces/user';

function getUser(): IUser | undefined {
	const user = StoragerHelper.getLoggedInUser();
	if (user) return user;
	return undefined;
}

function getAxiosRequestConfig() {
	var config: AxiosRequestConfig;
	var baseURL: string = process.env.NEXT_PUBLIC_API_URL
		? process.env.NEXT_PUBLIC_API_URL
		: 'https://localhost:5001';

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
			// if (error.response?.data?.code) {
			// const accessToken = getUser()?.accessToken;
			// const refreshToken = getUser()?.refreshToken;
			// api
			// 	.post('auth/refresh', {
			// 		accessToken,
			// 		refreshToken,
			// 		role: ERole.ADMIN,
			// 	})
			// 	.then((response) => {
			// 		api.defaults.headers.head = {
			// 			Authorization: `Bearer ${response.data.accessToken}`,
			// 		};
			// 	});
			// } else {
			// StoragerHelper.removeItem('frontcommerce.user');
			// Router.push('/login');
		}
	}
);
