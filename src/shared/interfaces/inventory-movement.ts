import { EOperation } from '../enums/operation.enum';
import { IInventoryProduct, IProductMovementBody } from './inventory-product';

export interface IInventoryMovementBody {
	contactId?: number;
	operation: EOperation;
	products: IProductMovementBody[];
}
export interface IInventoryMovementResponse {
	createdBy?: number;
	createdAt?: string;
	updatedBy?: number;
	updatedAt?: string;
	id: number;
	productId: number;
	amount: number;
}
