import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react';

interface DateProps extends React.InputHTMLAttributes<HTMLInputElement> {
	change: (value: string) => void;
	dateValue: Date | null;
	format: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
	})
);

const Date: React.FC<DateProps> = ({
	dateValue,
	change,
	format,
}): JSX.Element => {
	const classes = useStyles();

	const [currentValue, setCurrentValue] = useState<Date | null>(dateValue);

	const update = (value: string) => {
		// const date: Date = new Date()
		// setCurrentValue(date);
		change && change(value);
	};

	return (
		<TextField
			id="datetime-local"
			label="Next appointment"
			type="datetime-local"
			defaultValue={currentValue}
			className={classes.textField}
			onChange={(event) => {
				update(event.target.value);
			}}
			InputLabelProps={{
				shrink: true,
			}}
		/>
	);
};

export default Date;
