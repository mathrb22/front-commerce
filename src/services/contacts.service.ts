import { AxiosResponse } from 'axios';
import { Contact } from '../shared/interfaces/customer';
import { api } from './api';

export async function getContactInfo(
	id: number
): Promise<AxiosResponse<Contact>> {
	return new Promise((resolve, reject) => {
		api
			.get<Contact, AxiosResponse<Contact>>(`contact/${id}`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
