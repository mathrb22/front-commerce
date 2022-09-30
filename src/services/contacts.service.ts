import { AxiosResponse } from 'axios';
import { Contact } from '../shared/interfaces/contact';
import { Customer } from '../shared/interfaces/customer';
import { Pageable } from '../shared/interfaces/pageable';
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

export async function getAllCustomers(
	params?: URLSearchParams
): Promise<AxiosResponse<Pageable<Customer>>> {
	return new Promise((resolve, reject) => {
		api
			.get<Contact[], AxiosResponse<Pageable<Customer>>>('contact', {
				timeout: 8000,
				params: params,
			})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function exportCustomers(): Promise<AxiosResponse<Blob>> {
	return new Promise((resolve, reject) => {
		api
			.get<Blob, AxiosResponse<Blob>>('contact/export', {
				timeout: 8000,
				responseType: 'blob',
			})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
