import classes from '*.module.css';
import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Chip,
	Divider,
	AccordionActions,
	Button,
	makeStyles,
	createStyles,
	Theme,
	TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { type } from 'node:os';
import React, { useContext, useState } from 'react';
import { ResponseI } from '../../@interfaces';
import api from '../../api';
import { ResponseContext, UsersListContext } from '../../context';
import { RequestContent, RequestI } from './list';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: '1em',
			width: '100%',
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
	const { title, request, fields, description } = requestObj;
	const classes = useStyles();
	const [params, setParams] = useState<RequestParam>({});
	const { usersList } = useContext(UsersListContext);
	const { addResponse } = useContext(ResponseContext);

	const renderFields = () => {
		return fields.map((param) => {
			const { name, required, type, helper } = param;
			return (
				<div key={name}>
					<TextField
						id={name}
						label={name}
						required={required}
						type={type}
						onChange={(e) => {
							const value =
								type === 'string' ? e.target.value : Number(e.target.value);
							params[name] = value;
						}}
					/>
				</div>
			);
		});
	};

	const requestEnabled = () => {
		const user = usersList.find((u) => u.selected);
		if (user === undefined) return false;
		return true;
	};

	const sendRequest = async (e: any) => {
		e.preventDefault();
		const user = usersList.find((u) => u.selected);
		if (!user) return;

		const body = {
			user,
			request,
			...params,
		};
		const response = await api.generic(body);

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
