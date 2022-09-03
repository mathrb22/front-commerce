import axios from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { ERole } from '../shared/enums/role.enum';

let cookies = parseCookies();

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
		? process.env.NEXT_PUBLIC_API_BASE_URL
		: 'https://localhost:5001',
	headers: {
		Authorization: `Bearer ${cookies['frontcommerce.token']}`,
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			if (error.response?.data?.code) {
				cookies = parseCookies();

				const { 'frontcommerce.refreshToken': refreshToken } = cookies;
				const { 'frontcommerce.token': accessToken } = cookies;

				api.post('auth/refresh', {
					accessToken,
					refreshToken,
					role: ERole.ADMIN,
				});
			} else {
				destroyCookie(undefined, 'frontcommerce.token');
				destroyCookie(undefined, 'frontcommerce.refreshToken');

				Router.push('/login');
			}
		}
	}
);
