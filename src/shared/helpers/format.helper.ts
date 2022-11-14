import moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';
import { formatDistanceToNow } from 'date-fns';

export const formatCPF = (cpf: string): string => {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCNPJ = (cnpj: string): string => {
	return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatDocument = (document: string): string => {
	if (document.length === 11) return formatCPF(document);
	if (document.length === 14) return formatCNPJ(document);
	return document;
};

export const formatDateTimeStringToCompleteLocaleString = (
	date: string
): string => {
	return moment(date).format('LLLL');
};

export const formatDateTimeString = (date: string): string => {
	return moment(date).format('DD/MM/YYYY HH:mm:ss');
};

export const formatDateTimeStringToHowManyTimeAgo = (date: string): string => {
	return formatDistanceToNow(new Date(date), {
		locale: ptBR,
		addSuffix: true,
	});
};

export const convertDateToLocaleDate = (date: string) => {
	if (date) {
		return new Date(date).toLocaleDateString();
	}
};

export const formatPhoneNumber = (phoneNumber: string): string => {
	return phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
};

export const formatNumberWithDigitGroup = (number: number): string => {
	//format 12500 to 12.500
	return number.toLocaleString('pt-BR');
};
