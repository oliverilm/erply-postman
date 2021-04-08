import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

interface TextProps extends React.InputHTMLAttributes<HTMLInputElement> {
	change: (value: string) => void;
	value: string;
	label: string;
	required: boolean;
}

const Text: React.FC<TextProps> = ({
	value,
	change,
	label,
	required,
}): JSX.Element => {
	const [currentValue, setCurrentValue] = useState<string>(value);

	const update = (value: string) => {
		setCurrentValue(value);
		change && change(value);
	};

	return (
		<TextField
			label={label}
			margin="dense"
			required={required}
			type={'text'}
			value={currentValue}
			style={{ width: 300 }}
			onChange={(e) => {
				update(e.target.value);
			}}
		/>
	);
};

export default Text;
