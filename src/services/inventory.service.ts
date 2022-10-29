import { AxiosResponse } from 'axios';
import { IInventoryProduct } from '../shared/interfaces/inventory-product';
import { Pageable } from '../shared/interfaces/pageable';
import { api } from './api';

export async function getAllInventoryProducts(
	params?: URLSearchParams
): Promise<AxiosResponse<Pageable<IInventoryProduct>>> {
	return new Promise((resolve, reject) => {
		api
			.get<IInventoryProduct[], AxiosResponse<Pageable<IInventoryProduct>>>(
				'inventory',
				{
					timeout: 8000,
					params: params,
				}
			)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export function exportInventory(): Promise<AxiosResponse<Blob>> {
	return new Promise((resolve, reject) => {
		api
			.get<Blob, AxiosResponse<Blob>>('inventory/export', {
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
