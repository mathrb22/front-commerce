import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { IPhoneContact } from '../shared/types/phone';
import { IEmailContact } from '../shared/types/email';
import { api } from '../services/api';
import { IUser } from '../shared/types/user';

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
	surname: string;
	gender: string;
	documentNumber: string;
	birthdate?: string;
	password: string;
	passwordConfirm: string;
	phone: string;
	email?: string;
	phones?: Array<IPhoneContact>;
	emails?: Array<IEmailContact>;
}

type AuthContextData = {
	signIn: (credentials: SignInCredentials) => Promise<void>;
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
		// if (!isAuthenticated) {
		// 	Router.push('/login');
		// }
	}, []);

	async function signIn({ login, password }: SignInCredentials) {
		setUser({
			email: login,
			password: password,
		});

		// setCookie(undefined, 'user', 'true', {
		// 	maxAge: 60 * 60 * 24 * 30, // 30 days,
		// 	path: '/',
		// });

		Router.push('/products');
	}

	function signOut(): void {
		// destroyCookie(undefined, 'frontcommerce.token');
		// destroyCookie(undefined, 'frontcommerce.refreshToken');

		Router.push('/login');
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
