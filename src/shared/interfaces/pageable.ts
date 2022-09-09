export type Pageable<T> = {
	page: number;
	size: number;
	total: number;
	data: T[];
};
