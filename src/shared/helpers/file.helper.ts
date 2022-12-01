export const dataURLtoFile = async (base64: string, name: string) => {
	const type = base64.split(';')[0].split(':')[1] || 'image/png';
	//use fetch
	const base64Response = await fetch(base64);
	//convert to blob
	const blob = await base64Response.blob();
	//create file from blob
	return new File([blob], name, { type });
};
