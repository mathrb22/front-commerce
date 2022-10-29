import { EPersonType } from '../enums/person-type.enum';

export interface ICustomer {
	id?: number;
	name?: string;
	secondName?: string;
	documentNumber?: string;
	gender?: string;
	birthDate?: string;
	address?: string;
	personType?: string;
	phone?: string;
	imageUrl?: string;
	imageName?: string;
	email?: string;
	updatedAt?: string;
	createdAt?: string;
}
