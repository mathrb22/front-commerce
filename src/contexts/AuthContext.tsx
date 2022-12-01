import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { IUser } from '../shared/interfaces/user';
import { EPersonType } from '../shared/enums/person-type.enum';
import { signIn, signUp } from '../services/auth.service';
import { toast } from 'react-toastify';
import { ERole } from '../shared/enums/role.enum';
import { IContact } from '../shared/interfaces/contact';
import { getContactInfo } from '../services/contacts.service';
import { StorageHelper } from '../shared/helpers/storage.helper';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';

export type SignInCredentials = {
	login: string;
	password: string;
	role: ERole;
	keepMeConnected?: boolean;
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
	profileData: IContact;
	isLoading: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [profileData, setProfileData] = useState<IContact>({
		id: 0,
		name: '',
		email: '',
		phone: '',
	});
	toast.configure();

	async function login({
		login,
		password,
		role,
		keepMeConnected: rememberMe,
	}: SignInCredentials) {
		setIsLoading(true);
		signIn({ login, password, role })
			.then(
				async (response) => {
					setIsLoading(false);
					if (response && response.status == 200 && response.data) {
						const user: IUser = {
							login: login,
							role: role,
							userId: response.data.userId,
							accessToken: response.data.accessToken,
							refreshToken: response.data.refreshToken,
						};
						user.password = rememberMe
							? StorageHelper.encryptUsingAES256(password)
							: undefined;

						StorageHelper.setItem('frontcommerce.user', JSON.stringify(user));

						axios.defaults.headers.common[
							'Authorization'
						] = `Bearer ${user.accessToken}`;

						const userLoggedIn = StorageHelper.getLoggedInUser();
						if (userLoggedIn) {
							await getUserData();
						}

						Router.push('/dashboard');
					}
				},
				(err: AxiosError) => {
					setIsLoading(false);
					if (err.response?.data)
						toast.error(err.response?.data.description, {
							position: 'top-center',
							autoClose: 5000,
							theme: 'colored',
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
						});
					else
						toast.error('Não foi possível realizar o login. Tente novamente', {
							position: 'top-center',
							autoClose: 5000,
							theme: 'colored',
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
						});
				}
			)
			.catch((error) => {
				setIsLoading(false);
				toast('Não foi possível realizar o login. Tente novamente.', {
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
							password: signupBody.password,
							userId: response.data.userId,
							accessToken: response.data.accessToken,
							refreshToken: response.data.refreshToken,
						};

						localStorage.setItem('frontcommerce.user', JSON.stringify(user));

						axios.defaults.headers.common[
							'Authorization'
						] = `Bearer ${user.accessToken}`;

						getUserData().then(() => {
							Router.push('/dashboard');
						});
					}
				}
			})
			.catch((error) => {
				setIsLoading(false);
				toast('Não foi possível realizar o cadastro. Tente novamente.', {
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
		const user = StorageHelper.getLoggedInUser();
		if (user && user.userId) {
			setIsLoading(true);
			await getContactInfo(+user.userId)
				.then((res) => {
					if (res && res.data) {
						setProfileData(res.data);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					setIsLoading(false);
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
