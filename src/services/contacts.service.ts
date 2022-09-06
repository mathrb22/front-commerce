import { AxiosResponse } from 'axios';
import { Contact } from '../shared/interfaces/contact';
import { api } from './api';

export async function getContactInfo(
	id: number
): Promise<AxiosResponse<Contact>> {
	return new Promise((resolve, reject) => {
		api
			.get<Contact, AxiosResponse<Contact>>(`contact/${id}`, {
				timeout: 8000,
			})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function updateContactInfo(
	id: number,
	contact: Contact
): Promise<AxiosResponse<Contact>> {
	return new Promise((resolve, reject) => {
		api
			.put<Contact, AxiosResponse<Contact>>(`contact/${id}`, contact, {
				timeout: 8000,
			})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
