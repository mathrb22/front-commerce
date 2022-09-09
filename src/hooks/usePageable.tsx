import { useEffect, useState } from 'react';
import { Pageable } from '../shared/interfaces/pageable';

export interface initialOptions {
	page: number;
	size: number;
	params: URLSearchParams;
}

export interface IUsePageableProps<T> {
	dataLoader: (params: URLSearchParams) => Promise<Pageable<T>>;
	initialOpt?: initialOptions;
	successCallback?: (pageable: Pageable<T>) => any;
	errorCallback?: (error: any) => any;
	finallyCallback?: () => any;
	aditionalDeps?: ReadonlyArray<any>;
}

type IUsePageable<T> = [
	data: T[],
	pageable: {
		total: number;
		page: number;
		size: number;
		params: URLSearchParams;
		nextPage: () => void;
		previousPage: () => void;
		changePage: (page: number) => void;
		changeSize: (pageSize: number) => void;
		loading: boolean;
		error: boolean;
		setCustomParams: (
			customParams: {
				name: string;
				value: string;
			}[]
		) => void;
		setSort: (sort?: 'asc' | 'desc' | 'ascend' | 'descend') => void;
		setOrder: (order?: string) => void;
		setQuery: (query?: string) => void;
		clearParams: () => void;
		removeCustomParams: (names: string[]) => void;
	}
];

export function usePageable<T>({
	dataLoader,
	initialOpt = {
		page: 1,
		size: 10,
		params: new URLSearchParams(),
	},
	successCallback = () => {},
	errorCallback = () => {},
	finallyCallback = () => {},
	aditionalDeps = [],
}: IUsePageableProps<T>): IUsePageable<T> {
	const [page, setPage] = useState(initialOpt.page);
	const [size, setSize] = useState(initialOpt.size);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState<T[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [params, setParams] = useState(initialOpt.params);

	if (page) params.set('page', page.toString());
	if (params) params.set('size', size.toString());

	const changePage = (page: number) => {
		setPage(page);
		params.set('page', page.toString());
	};

	const changeSize = (pageSize: number) => {
		setSize(pageSize);
		params.set('size', pageSize.toString());
	};

	const setCustomParams = (customParams: { name: string; value: string }[]) => {
		for (const p of customParams) {
			params.set(p.name, p.value);
		}
		setParams(params);
	};

	const removeCustomParams = (customParams: string[]) => {
		for (const p of customParams) {
			params.delete(p);
		}
		setParams(params);
	};

	const setSort = function (sort?: 'asc' | 'desc' | 'ascend' | 'descend') {
		if (sort) {
			if (sort === 'ascend') sort = 'asc';
			else if (sort === 'descend') sort = 'desc';

			params.set('sort', sort);
		} else params.delete('sort');

		setParams(params);
	};

	const setOrder = function (order?: string) {
		if (order) params.set('order', order);
		else params.delete('order');

		setParams(params);
	};

	const setQuery = function (query?: string) {
		if (query) params.set('query', query);
		else params.delete('query');

		setParams(params);
	};

	const nextPage = function () {
		if (!isLastPage()) setPage(page + 1);
	};

	const isLastPage = function (): boolean {
		return page === totalPages();
	};

	const totalPages = function (): number {
		return Math.ceil(total / size);
	};

	const previousPage = function () {
		if (!isFirstPage()) setPage(page - 1);
	};

	const isFirstPage = function (): boolean {
		return page === 1;
	};

	const clearParams = function () {
		setParams(initialOpt.params);
	};

	useEffect(() => {
		setLoading(true);
		dataLoader(params)
			.then((response) => {
				setTotal(response.total);
				setPage(response.page);
				setData(response.data);

				successCallback(response);
			})
			.catch((error) => {
				setError(error);
				errorCallback(error);
			})
			.finally(() => {
				finallyCallback();
				setLoading(false);
			});
	}, [params, ...aditionalDeps]);

	return [
		data,
		{
			total,
			page,
			size,
			params,
			nextPage,
			previousPage,
			changePage,
			changeSize,
			setCustomParams,
			loading,
			error,
			setSort,
			setOrder,
			setQuery,
			clearParams,
			removeCustomParams,
		},
	];
}
