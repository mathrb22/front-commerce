export interface Customer {
	id: string;
	address: {
		country: string;
		state: string;
		city: string;
		street: string;
	};
	avatarUrl: string;
	createdAt: number;
	email: string;
	name: string;
	phone: string;
}
