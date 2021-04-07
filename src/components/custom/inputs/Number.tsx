import React, { useState, useEffect } from 'react';

interface NumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
	change: (value: string) => void;
	value: string | number;
}

const Number: React.FC<NumberProps> = ({
	value,
	change,
	...rest
}): JSX.Element => {
	const [currentValue, setCurrentValue] = useState<string | number>(value);
	return <div>New Element</div>;
};

export default Number;
