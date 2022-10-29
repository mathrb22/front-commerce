import { AxiosResponse } from 'axios';
import { Pageable } from '../shared/interfaces/pageable';
import { IProduct } from '../shared/interfaces/product';
import { api } from './api';

export async function getAllProducts(
	params?: URLSearchParams
): Promise<AxiosResponse<Pageable<IProduct>>> {
	return new Promise((resolve, reject) => {
		api
			.get<IProduct[], AxiosResponse<Pageable<IProduct>>>('product', {
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

export async function exportProducts(): Promise<AxiosResponse<Blob>> {
	return new Promise((resolve, reject) => {
		api
			.get<Blob, AxiosResponse<Blob>>('product/export', {
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

export async function getProductInfo(
	id: number
): Promise<AxiosResponse<IProduct>> {
	return new Promise((resolve, reject) => {
		api
			.get<IProduct, AxiosResponse<IProduct>>(`product/${id}`, {
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

export async function deleteProduct(
	id: number
): Promise<AxiosResponse<IProduct>> {
	return new Promise((resolve, reject) => {
		api
			.delete(`product/${id}`, {
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

export async function createProduct(
	product: IProduct
): Promise<AxiosResponse<IProduct>> {
	return new Promise((resolve, reject) => {
		api
			.post<IProduct, AxiosResponse<IProduct>>(`product`, product, {
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

export async function updateProduct(
	id: number,
	product: IProduct
): Promise<AxiosResponse<IProduct>> {
	return new Promise((resolve, reject) => {
		api
			.put<IProduct, AxiosResponse<IProduct>>(`product/${id}`, product, {
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
