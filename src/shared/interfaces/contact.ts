import { Moment } from 'moment';

export interface Contact {
	id?: number;
	name?: string;
	secondName?: string;
	gender?: string;
	birthdate?: string | Moment | null;
	address?: string;
	personTypeId?: number;
	personType?: number;
	phone?: string;
	imageUrl?: string;
	imageName?: string;
	email?: string;
	updatedAt?: string;
	createdAt?: string;
}
