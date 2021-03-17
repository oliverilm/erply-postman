import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Divider,
	AccordionActions,
	Button,
	makeStyles,
	createStyles,
	Theme,
	TextField,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useState } from 'react';
import { ResponseI } from '../../@interfaces';
import api from '../../api';
import { ResponseContext, UsersListContext } from '../../context';
import { RequestI } from './list';

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

interface Props {
	requestObj: RequestI;
}

interface RequestParam {
	[key: string]: string | number;
}

const Request: React.FC<Props> = ({ requestObj }): JSX.Element => {
	const { request, fields } = requestObj;
	const classes = useStyles();
	const [params, setParams] = useState<RequestParam>({});
	const { usersList } = useContext(UsersListContext);
	const { addResponse, setIsLoading } = useContext(ResponseContext);

	const change = (name: string, value: string | unknown) => {
		const tempParams = params;
		tempParams[name] =
			typeof value === 'string' || typeof value === 'number' ? value : ''; // TODO: seems wrong

		setParams(tempParams);
	};

	const renderFields = () => {
		return fields.map((param) => {
			const { name, required, type, options } = param;

			return (
				<div key={name} style={{ marginTop: '.5em' }}>
					{type === 'select' ? (
						<>
							<InputLabel id={`${name}-label`}>{name}</InputLabel>
							<Select
								style={{ width: 300 }}
								labelId={`${name}-label`}
								id={`${name}-select`}
								value={params[name]} // TODO: fix this
								onChange={(e) => {
									change(name, e.target.value);
								}}
							>
								<MenuItem value={undefined}></MenuItem>
								{options?.map((op) => (
									<MenuItem key={op} value={op}>
										{op}
									</MenuItem>
								))}
							</Select>
						</>
					) : (
						<TextField
							id={name}
							label={name}
							required={required}
							type={type}
							style={{ width: 300 }}
							onChange={(e) => {
								change(name, e);
							}}
						/>
					)}
				</div>
			);
		});
	};

	const requestEnabled = () => {
		const user = usersList.find((u) => u.selected);
		if (user === undefined) return false;
		return true;
	};

	const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = usersList.find((u) => u.selected);
		if (!user) return;
		setIsLoading(true);
		const body = {
			user,
			request,
			...params,
		};
		const response = await api.generic(body);
		setIsLoading(false);

		const responseObj: ResponseI = {
			user,
			request,
			time: +new Date() / 1000,
			response,
			error: response.data.status.responseStatus === 'error',
		};
		addResponse(responseObj);
	};

	return (
		<div className={classes.root}>
			<form onSubmit={sendRequest}>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1c-content"
						id="panel1c-header"
					>
						<Typography className={classes.heading}>{request}</Typography>
					</AccordionSummary>
					<AccordionDetails className={classes.details}>
						{renderFields()}
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

export default Request;
