import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onClear?: (val: string) => void;
}

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.5em;
	letter-spacing: 2px;
	margin: 0.1em;
	width: 300px;
`;

const Clear = styled.span`
	cursor: pointer;
	position: relative;
	left: -26px;
	color: #a0a0a0;
	font-size: 30px;
	top: 5px;
`;

const Search: React.FC<SearchProps> = ({
	onChange,
	onClear,
	value = '',
	...rest
}): JSX.Element => {
	const [ss, setSS] = useState<string>(String(value));

	return (
		<div>
			<Input
				{...rest}
				onChange={(e) => {
					setSS(e.target.value);
					onChange && onChange(e);
				}}
				value={ss}
				type="text"
			/>
			<Clear
				className={'clear-icon'}
				onClick={() => {
					setSS('');
					onClear && onClear('');
				}}
			>
				&times;
			</Clear>
		</div>
	);
};

export default Search;
