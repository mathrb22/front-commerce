import { AxiosResponse } from 'axios';
import { Pageable } from '../shared/interfaces/pageable';
import { Product } from '../shared/interfaces/product';
import { api } from './api';

export async function getAllProducts(
	params?: URLSearchParams
): Promise<AxiosResponse<Pageable<Product>>> {
	return new Promise((resolve, reject) => {
		api
			.get<Product[], AxiosResponse<Pageable<Product>>>('product', {
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
): Promise<AxiosResponse<Product>> {
	return new Promise((resolve, reject) => {
		api
			.get<Product, AxiosResponse<Product>>(`product/${id}`, {
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
): Promise<AxiosResponse<Product>> {
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
	product: Product
): Promise<AxiosResponse<Product>> {
	return new Promise((resolve, reject) => {
		api
			.post<Product, AxiosResponse<Product>>(`product`, product, {
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
	product: Product
): Promise<AxiosResponse<Product>> {
	return new Promise((resolve, reject) => {
		api
			.put<Product, AxiosResponse<Product>>(`product/${id}`, product, {
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
