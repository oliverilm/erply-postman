import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Divider,
	AccordionActions,
	Button,
	createStyles,
	makeStyles,
	Theme,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import React, { useState, useEffect } from 'react';
import { CafaRequestFieldI, CafaRequestI } from './requestList';

interface CafaRequestProps {
	request: CafaRequestI;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: '1em',
			width: '98%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
		},
		details: {
			display: 'flex',
			flexDirection: 'column',
		},
	})
);

const CafaRequest: React.FC<CafaRequestProps> = ({ request }): JSX.Element => {
	const classes = useStyles();
	const [formState, setFormState] = useState<any>(() => {
		const allStates: { [key: string]: string } = {};
		request.fields?.forEach((field) => {
			allStates[field.name] = '';
		});
	});
	const submit = (): void => {
		// submit the filled form.
	};

	const change = (fieldName: string, value: string | unknown) => {
		// change the value
	};

	const generateFieldJSX = (field: CafaRequestFieldI): JSX.Element => {
		if (field.type === 'select') {
			return (
				<div key={`${request}-${name}`} style={{ marginTop: '.5em' }}>
					<InputLabel id={`${field.name}-label`}>{field.name}</InputLabel>
					<Select
						style={{ width: 300 }}
						labelId={`${field.name}-label`}
						id={`${field.name}-select`}
						required={field.required}
						value={''}
						onChange={(e) => {
							change(field.name, e.target.value);
						}}
					>
						<MenuItem value={''}></MenuItem>
						{field.options &&
							field.options.map((op) => (
								<MenuItem key={`${op}-${field.name}`} value={op}>
									{op}
								</MenuItem>
							))}
					</Select>
				</div>
			);
		} else if (field.type === 'number') {
			return (
				<div key={`${request}-${field.name}`} style={{ marginTop: '.5em' }}>
					<TextField
						id={`${request}-${field.name}`}
						label={field.name}
						required={field.required}
						type={'number'}
						style={{ width: 300 }}
						onChange={(e) => {
							change(field.name, e.target.value);
						}}
					/>
				</div>
			);
		} else {
			// string
			return (
				<div key={`${request}-${field.name}`} style={{ marginTop: '.5em' }}>
					<TextField
						id={`${request}-${field.name}`}
						label={field.name}
						required={field.required}
						type={'text'}
						style={{ width: 300 }}
						onChange={(e) => {
							change(field.name, e.target.value);
						}}
					/>
				</div>
			);
		}
	};

	const requestEnabled = (): boolean => {
		return true;
	};

	return (
		<div className={classes.root}>
			<form onSubmit={submit}>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1c-content"
						id="panel1c-header"
					>
						<Typography component={'span'} className={classes.heading}>
							{request.request}
						</Typography>
					</AccordionSummary>
					<AccordionDetails className={classes.details}>
						{request.fields && request.fields.map(generateFieldJSX)}
					</AccordionDetails>
					<Divider />
					<AccordionActions>
						<Button
							disabled={!requestEnabled()}
							size="small"
							color="primary"
							type={'submit'}
						>
							Send Request
						</Button>
					</AccordionActions>
				</Accordion>
			</form>
		</div>
	);
};

export default CafaRequest;
