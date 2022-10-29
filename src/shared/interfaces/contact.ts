import { Moment } from 'moment';
import { EPersonType } from '../enums/person-type.enum';

export interface IContact {
	id?: number;
	name?: string;
	secondName?: string;
	gender?: string;
	birthdate?: string | Moment | null;
	documentNumber?: string;
	address?: string;
	personTypeId?: number;
	personType?: EPersonType;
	phone?: string;
	imageUrl?: string;
	imageName?: string;
	email?: string;
	updatedAt?: string;
	createdAt?: string;
}
