import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { api } from '../services/api';
import { IUser } from '../shared/interfaces/user';
import { EPersonType } from '../shared/enums/person-type.enum';
import { signIn, signUp } from '../services/auth.service';
import { toast } from 'react-toastify';
import { ERole } from '../shared/enums/role.enum';
import { Contact } from '../shared/interfaces/contact';
import { getContactInfo } from '../services/contacts.service';
import { StoragerHelper } from '../shared/helpers/storage.helper';

export type SignInCredentials = {
	login: string;
	password: string;
	role: ERole;
};

export interface ISignUp {
	name: string;
	secondName: string;
	gender?: string;
	personType: EPersonType;
	documentNumber: string;
	birthdate?: string;
	password: string;
	phone: string;
	email: string;
}

export interface IAuthResponse {
	userId: string;
	accessToken: string;
	refreshToken: string;
}

export interface IRefreshBody {
	accessToken: string;
	refreshToken: string;
	role: string;
}

type AuthContextData = {
	login: (credentials: SignInCredentials) => Promise<void>;
	register: (signUp: ISignUp) => Promise<void>;
	logout: () => void;
	getUserData: () => Promise<void>;
	profileData: Contact;
	isLoading: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [profileData, setProfileData] = useState<Contact>({
		id: 0,
		name: '',
		email: '',
		phone: '',
	});

	async function login({ login, password, role }: SignInCredentials) {
		setIsLoading(true);
		signIn({ login, password, role })
			.then(async (response) => {
				setIsLoading(false);
				if (response.status == 200 && response.data) {
					const user = {
						login: login,
						role: role,
						userId: response.data.userId,
						accessToken: response.data.accessToken,
						refreshToken: response.data.refreshToken,
					};
					console.log(user);
					localStorage.setItem('frontcommerce.user', JSON.stringify(user));

					api.defaults.headers.head = {
						Authorization: `Bearer ${response.data.accessToken}`,
					};

					const userLoggedIn = StoragerHelper.getLoggedInUser();
					if (userLoggedIn) {
						await getUserData();
					}

					Router.push('/products');
				}
			})
			.catch((error) => {
				setIsLoading(false);
				toast.warn('Não foi possível realizar o login. Tente novamente.', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			});
	}

	async function register(signupBody: ISignUp) {
		setIsLoading(true);
		signUp(signupBody)
			.then(async (response) => {
				setIsLoading(false);
				if (response.status == 200 && response.data) {
					if (response.data.userId) {
						const user = {
							login: signupBody.email,
							userId: response.data.userId,
							accessToken: response.data.accessToken,
							refreshToken: response.data.refreshToken,
						};

						console.log(user);
						localStorage.setItem('frontcommerce.user', JSON.stringify(user));

						api.defaults.headers.head = {
							Authorization: `Bearer ${response.data.accessToken}`,
						};

						await getUserData();

						Router.push('/products');
					}
				}
			})
			.catch((error) => {
				setIsLoading(false);
				toast.warn('Não foi possível realizar o cadastro. Tente novamente.', {
					position: 'top-center',
					autoClose: 5000,
					theme: 'colored',
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			});
	}

	async function getUserData() {
		const user = StoragerHelper.getLoggedInUser();
		if (user && user.userId) {
			setIsLoading(true);
			await getContactInfo(+user.userId).then((res) => {
				console.log(res);
				if (res.data) {
					setProfileData(res.data);
					setIsLoading(false);
				}
			});
		}
	}

	function logout(): void {
		localStorage.removeItem('frontcommerce.user');
		Router.push('/login');
	}

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isLoading, login, register, logout, profileData, getUserData }}>
			{children}
		</AuthContext.Provider>
	);
}
