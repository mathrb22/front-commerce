export interface IInventoryProduct {
	productId: number;
	name?: string;
	amount?: number;
	quantity?: number;
	lastUpdate?: string;
}

export interface IProductMovementBody {
	productId: number;
	amount?: number;
}
