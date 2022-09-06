import { IUser } from '../interfaces/user';

export class StoragerHelper {
	static getItem(key: string): string | null {
		if (typeof window !== 'undefined') return localStorage.getItem(key);
		return null;
	}

	static setItem(key: string, value: string): void {
		if (typeof window !== 'undefined') localStorage.setItem(key, value);
	}

	static removeItem(key: string): void {
		if (typeof window !== 'undefined') localStorage.removeItem(key);
	}

	static getLoggedInUser(): IUser | undefined {
		if (typeof window !== 'undefined') {
			const user = localStorage.getItem('frontcommerce.user');

			if (user) {
				return JSON.parse(user);
			}
			return undefined;
		}
	}
}
