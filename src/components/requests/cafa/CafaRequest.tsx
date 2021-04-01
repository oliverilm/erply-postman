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

import React, { useContext, useState } from 'react';
import { UserI } from '../../../@interfaces';
import { ResponseContext } from '../../../context';
import { CafaRequestFieldI, CafaRequestI } from '../requestLists/cafaRequests';

interface CafaRequestProps {
	request: CafaRequestI;
	user: UserI;
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

const CafaRequest: React.FC<CafaRequestProps> = ({
	request,
	user,
}): JSX.Element => {
	const classes = useStyles();
	const { addResponse, setIsLoading } = useContext(ResponseContext);

	const [formState, setFormState] = useState<{ [key: string]: string }>(() => {
		const allStates: { [key: string]: string } = {};
		if (request.fields) {
			request.fields?.forEach((field) => {
				allStates[field.name] = '';
			});
		}

		return allStates;
	});
	const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		// submit the filled form.
		e.preventDefault();
		console.log(formState);
		const { apiFunction } = request;

		setIsLoading(true);
		const response = await apiFunction(user, formState);
		console.log(response);
		const responseObj = {
			user,
			request: apiFunction.name,
			time: +new Date() / 1000,
			response: response,
			error: true,
		};
		addResponse(responseObj);
		setIsLoading(false);
	};

	const change = (fieldName: string, value: string) => {
		const state = { ...formState };
		state[fieldName] = value;
		setFormState(state);
	};

	const generateFieldJSX = (
		field: CafaRequestFieldI,
		index: number
	): JSX.Element => {
		if (field.type === 'select') {
			return (
				<div
					key={`${request.request}-${name}-${index}`}
					style={{ marginTop: '.5em' }}
				>
					<InputLabel id={`${field.name}-label`}>{field.name}</InputLabel>
					<Select
						style={{ width: 300 }}
						labelId={`${field.name}-label`}
						id={`${field.name}-select`}
						required={field.required}
						margin="dense"
						value={formState[field.name]}
						onChange={(e) => {
							change(field.name, e.target.value as string);
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
				<div
					key={`${request.request}-${field.name}-${index}`}
					style={{ marginTop: '.5em' }}
				>
					<TextField
						id={`${request.request}-${field.name}`}
						label={field.name}
						required={field.required}
						value={formState[field.name]}
						margin="dense"
						type={'number'}
						style={{ width: 300 }}
						onChange={(e) => {
							change(field.name, e.target.value as string);
						}}
					/>
				</div>
			);
		} else {
			// string
			return (
				<div
					key={`${request.request}-${field.name}-${index}`}
					style={{ marginTop: '.5em' }}
				>
					<TextField
						id={`${request.request}-${field.name}`}
						label={field.name}
						required={field.required}
						margin="dense"
						value={formState[field.name]}
						type={'text'}
						style={{ width: 300 }}
						onChange={(e) => {
							change(field.name, e.target.value as string);
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
				<Accordion
					expanded={
						request.fields && request.fields.length > 0 ? undefined : false
					}
				>
					<AccordionSummary
						expandIcon={
							request.fields && request.fields.length > 0 ? (
								<ExpandMoreIcon />
							) : (
								<Button
									disabled={!requestEnabled()}
									size="small"
									color="primary"
									type={'submit'}
									style={{ padding: 0, margin: 0 }}
								>
									Send Request
								</Button>
							)
						}
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
