import { EPersonType } from '../enums/person-type.enum';

export interface Contact {
	id?: string;
	name?: string;
	secondName?: string;
	gender?: string;
	birthdate?: string;
	address?: string;
	personType?: EPersonType;
	phone?: string;
	imageUrl?: string;
	imageName?: string;
	email?: string;
	updatedAt?: string;
	createdAt?: string;
}
