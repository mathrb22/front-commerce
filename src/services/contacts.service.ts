import { AxiosResponse } from 'axios';
import { IContact } from '../shared/interfaces/contact';
import { ICustomer } from '../shared/interfaces/customer';
import { Pageable } from '../shared/interfaces/pageable';
import { api } from './api';

export interface IContactImage {
	id: number;
	imageName: string;
	imageUrl: string;
}

export async function getContactInfo(
	id: number
): Promise<AxiosResponse<IContact>> {
	return new Promise((resolve, reject) => {
		api
			.get<IContact, AxiosResponse<IContact>>(`contact/${id}`, {
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

export async function createContact(
	contact: IContact
): Promise<AxiosResponse<IContact>> {
	return new Promise((resolve, reject) => {
		api
			.post<IContact, AxiosResponse<IContact>>(`contact`, contact, {
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
	contact: IContact
): Promise<AxiosResponse<IContact>> {
	return new Promise((resolve, reject) => {
		api
			.put<IContact, AxiosResponse<IContact>>(`contact/${id}`, contact, {
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

export async function deleteContact(
	id: number
): Promise<AxiosResponse<IContact>> {
	return new Promise((resolve, reject) => {
		api
			.delete<IContact, AxiosResponse<IContact>>(`contact/${id}`, {
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
): Promise<AxiosResponse<Pageable<ICustomer>>> {
	return new Promise((resolve, reject) => {
		api
			.get<ICustomer[], AxiosResponse<Pageable<ICustomer>>>('contact', {
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

export async function updateContactImage(
	id: number,
	imageName: string,
	imageUrl: string
): Promise<AxiosResponse> {
	return new Promise((resolve, reject) => {
		const requestBody = {
			imageName,
			imageUrl,
		};

		api
			.put(`contact/${id}/image`, requestBody, {
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

export async function getContactImage(
	id: number
): Promise<AxiosResponse<IContactImage>> {
	return new Promise((resolve, reject) => {
		api
			.get<IContactImage, AxiosResponse>(`contact/${id}/image`, {
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
