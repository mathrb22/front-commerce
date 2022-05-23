import { v4 as uuid } from 'uuid';
import { Customer } from '../shared/types/customer';

export const customers: Customer[] = [
	{
		id: uuid(),
		name: 'Thiago Marcelo Felipe Assunção',
		email: 'thiagomarceloassuncao@iglod.com',
		phone: '(11) 98798-6470',
		avatarUrl: '/images/avatars/avatar_1.png',
	},
	{
		id: uuid(),
		name: 'Gabriela Amanda Clarice Fernandes',
		email: 'gabriela_amanda_fernandes@scalioni.com.br',
		phone: '(16) 98811-8591',
		avatarUrl: '/images/avatars/avatar_2.png',
	},
	{
		id: uuid(),
		name: 'Murilo Anthony Figueiredo',
		email: 'murilo.anthony.figueiredo@gmail.com.br',
		phone: '(11) 98798-6470',
		avatarUrl: '/images/avatars/avatar_3.png',
	},
	{
		id: uuid(),
		name: 'Bianca Fabiana Galvão',
		email: 'bianca.fabiana.galvao@unifox.com.br',
		phone: '(19) 99168-7197',
		avatarUrl: '/images/avatars/avatar_10.png',
	},
	{
		id: uuid(),
		name: 'Bryan Theo Pedro Henrique Mendes',
		email: 'bryan_theo_mendes@pq.cnpq.br',
		phone: '(19) 98406-9899',
		avatarUrl: '/images/avatars/avatar_5.png',
	},
	{
		id: uuid(),
		name: 'Luciana Hadassa Maya Costa',
		email: 'luciana-costa77@rocketmail.com',
		phone: '(11) 98174-0617',
		avatarUrl: '/images/avatars/avatar_6.png',
	},
	{
		id: uuid(),
		name: 'Sara Elaine Carolina Peixoto',
		email: 'sara_peixoto@pierproj.com.br',
		phone: '(12) 99184-9476',
		avatarUrl: '/images/avatars/avatar_11.png',
	},
];
