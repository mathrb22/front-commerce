import { v4 as uuid } from 'uuid';
import { Product } from '../shared/types/product';

export const products: Product[] = [
	{
		id: uuid(),
		name: 'Refrigerante Antarctica Guaraná 350ml lata',
		description:
			'O refrigerante que é coisa nossa, original do Brasil. O clássico dos clássicos, combina com tudo! Da pipoca à coxinha, do hamburgão ao acarajé.',
		media: '/images/products/guarana.jpg',
		price: 35.95,
		amount: 45,
		inclusionDate: '17/04/2022',
	},
	{
		id: uuid(),
		name: 'Água Mineral Crystal sem Gás 1,5 Litros',
		description:
			'A Água Mineral Crystal vem de diversas fontes minerais mais puras do país.',
		media: '/images/products/agua.jpg',
		price: 4.69,
		amount: 100,
		inclusionDate: '19/04/2022',
	},
	{
		id: uuid(),
		name: 'Chocolate KitKat ao Leite 41,5g',
		description:
			'O wafer kitkat é recheado e coberto com chocolate. É feito com quatro tirinhas de wafer crocantes, recheadas e cobertas com saboroso chocolate Nestlé.',
		media: '/images/products/kitkat.jpg',
		price: 3.39,
		amount: 100,
		inclusionDate: '16/04/2022',
	},
	{
		id: uuid(),
		name: 'Batata Pringles original 114G',
		description: 'Batata pringles original 114G',
		media: '/images/products/pringles.jpg',
		price: 8.99,
		amount: 80,
		inclusionDate: '18/04/2022',
	},
	{
		id: uuid(),
		name: 'Leite UHT Integral Italac 1 Litro',
		description: 'Leite UHT Integral Italac 1 Litro',
		media: '/images/products/leite.webp',
		price: 3.89,
		amount: 120,
		inclusionDate: '17/04/2022',
	},
	{
		id: uuid(),
		name: 'Amendoim japonês 320G dori',
		description: 'Amendoim japones 320G dori',
		media: '/images/products/amendoim-dori.webp',
		price: 6.99,
		amount: 85,
		inclusionDate: '16/04/2022',
	},
	{
		id: uuid(),
		name: 'Confeito M&Ms Chocolate ao Leite 148g Mars',
		description:
			'Confeitos coloridos de chocolate ao leite com uma casquinha crocante. No tamanho ideal para dividir com a galera!',
		media: '/images/products/mm.webp',
		price: 8.99,
		amount: 50,
		inclusionDate: '17/04/2022',
	},
];
