import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { IPhoneContact } from '../shared/interfaces/phone';
import { IEmailContact } from '../shared/interfaces/email';
import { api } from '../services/api';
import { IUser } from '../shared/interfaces/user';
import { PersonType } from '../shared/enums/person-type.enum';

type ApiResponse = {
	data: {
		userId: string;
		accessToken: string;
		refreshToken: string;
		expires: string;
	};
};

type SignInCredentials = {
	login: string;
	password: string;
	role?: string;
};

export interface ISignUp {
	name: string;
	secondName: string;
	gender: string;
	personType: PersonType;
	documentNumber: string;
	birthdate?: string;
	password: string;
	phone: string;
	email?: string;
}

type AuthContextData = {
	signIn: (credentials: SignInCredentials) => Promise<void>;
	signUp: (signUp: ISignUp) => Promise<void>;
	signOut: () => void;
	isAuthenticated: boolean;
	user: IUser | null;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	const isAuthenticated = !!user;

	useEffect(() => {
		const { 'frontcommerce.token': token } = parseCookies();
		if (token) {
			console.log(token);
		}
	}, []);

	async function signIn({ login, password, role }: SignInCredentials) {
		const response = await api.post<SignInCredentials, ApiResponse>(
			'auth/sign-in',
			{
				login,
				password,
				role: role ?? 'USER',
			}
		);
		const { userId, accessToken, refreshToken, expires } = response.data;

		setCookie(undefined, 'frontcommerce.token', accessToken, {
			maxAge: 60 * 60 * 24 * 30, // 30 days,
			path: '/',
		});

		setCookie(undefined, 'frontcommerce.refreshToken', refreshToken, {
			maxAge: 60 * 60 * 24 * 30, // 30 days,
			path: '/',
		});

		setUser({
			login,
			userId,
			accessToken,
			refreshToken,
			expires,
		});

		api.defaults.headers.head = {
			Authorization: `Bearer ${accessToken}`,
		};

		Router.push('/');
	}

	async function signUp(data: ISignUp) {
		await api.post<ISignUp, ApiResponse>('auth/sign-up', data);

		Router.push('/login');
	}

	function signOut(): void {
		destroyCookie(undefined, 'frontcommerce.token');
		destroyCookie(undefined, 'frontcommerce.refreshToken');

		Router.push('/login');
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signUp, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
