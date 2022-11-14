import { EOperation } from '../enums/operation.enum';
import { IInventoryProduct } from './inventory-product';

export interface IInventoryMovementBody {
	contactId?: number;
	operation: EOperation;
	products: IInventoryProduct[];
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
