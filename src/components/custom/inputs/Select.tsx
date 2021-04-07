import { InputLabel, MenuItem, Select as MSelect } from '@material-ui/core';
import React, { useState } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: string[];
	change: (value: string) => void;
	value: string;
	label: string;
}

const Select: React.FC<SelectProps> = ({
	value,
	options,
	change,
	label,
}): JSX.Element => {
	const [currentValue, setCurrentValue] = useState<string>(value);

	const update = (value: string) => {
		setCurrentValue(value);
		change && change(value);
	};

	return (
		<>
			<InputLabel id={`${label}-label`}>{label}</InputLabel>
			<MSelect
				style={{ width: 300 }}
				labelId={`${label}-label`}
				id={`${label}-select`}
				value={currentValue}
				margin="dense"
				onChange={(e) => {
					update(e.target.value as string);
				}}
			>
				<MenuItem value={''}></MenuItem>
				{options?.map((option) => (
					<MenuItem key={`${option}-${label}`} value={option}>
						{option}
					</MenuItem>
				))}
			</MSelect>
		</>
	);
};

export default Select;
