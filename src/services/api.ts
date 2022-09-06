import axios from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { ERole } from '../shared/enums/role.enum';
import { StoragerHelper } from '../shared/helpers/storage.helper';
import { IUser } from '../shared/interfaces/user';

function getUser(): IUser | undefined {
	const user = StoragerHelper.getLoggedInUser();
	if (user) return user;
	return undefined;
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
		? process.env.NEXT_PUBLIC_API_BASE_URL
		: 'https://localhost:5001',
	headers: {
		Authorization: `Bearer ${getUser()?.accessToken}`,
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			if (error.response?.data?.code) {
				const accessToken = getUser()?.accessToken;
				const refreshToken = getUser()?.refreshToken;

				api.post('auth/refresh', {
					accessToken,
					refreshToken,
					role: ERole.ADMIN,
				});
			} else {
				StoragerHelper.removeItem('frontcommerce.user');
				Router.push('/login');
			}
		}
	}
);
