import { IUser } from '../interfaces/user';
import * as CryptoJS from 'crypto-js';

export class StorageHelper {
	private static key = 'TCC_Fr0nt_C0mmerc3';

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

	static encryptUsingAES256(token: string): string {
		const fkey = CryptoJS.enc.Utf8.parse(StorageHelper.key);
		console.log('key: ' + fkey.toString());
		const fiv = CryptoJS.enc.Utf8.parse(StorageHelper.key);
		console.log('iv: ' + fiv.toString());
		const encrypted = CryptoJS.AES.encrypt(JSON.stringify(token), fkey, {
			keySize: 16,
			fiv,
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		return encrypted.toString();
	}

	static decryptUsingAES256(token: string): string {
		const fkey = CryptoJS.enc.Utf8.parse(StorageHelper.key);
		const fiv = CryptoJS.enc.Utf8.parse(StorageHelper.key);

		const decrypted = CryptoJS.AES.decrypt(token, fkey, {
			keySize: 16,
			fiv,
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		}).toString(CryptoJS.enc.Utf8);

		console.log('decrypted', decrypted.toString());
		return decrypted;
	}
}
