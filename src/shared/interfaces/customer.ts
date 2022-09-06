import { EPersonType } from '../enums/person-type.enum';

export interface Customer {
	id?: string;
	name?: string;
	secondName?: string;
	gender?: string;
	birthdate?: string;
	address?: string;
	personType?: number;
	phone?: string;
	imageUrl?: string;
	imageName?: string;
	email?: string;
	updatedAt?: string;
	createdAt?: string;
}
