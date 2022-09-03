import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

export interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

export const MaskedInput = forwardRef<HTMLElement, CustomProps>(
	function TextMaskCustom(props: any) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask='000.000.000-00'
				onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
				overwrite
			/>
		);
	}
);

export default MaskedInput;
