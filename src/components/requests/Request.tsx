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
import { RequestType } from '../../@types';
import api from '../../api';
import { ResponseContext, UsersListContext } from '../../context';
import { RequestI } from './requestLists/erplyRequests';
import StarRateIcon from '@material-ui/icons/StarRate';
import PluginStorage from '../../api/storage';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: '.6em',
			marginBottom: '.6em',
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
	apiField: RequestType;
}

interface RequestParam {
	[key: string]: string | number;
}

const Request: React.FC<Props> = ({
	requestObj,
	apiField = 'ERPLY',
}): JSX.Element => {
	const { request, fields } = requestObj;
	const classes = useStyles();
	const [isFavorite, setIsFavorite] = useState(PluginStorage.isFav(request));
	const [params, setParams] = useState<RequestParam>(() => {
		const state: RequestParam = {};
		fields.forEach(({ name }) => {
			state[name] = '';
		});
		return state;
	});
	const { usersList } = useContext(UsersListContext);
	const { addResponse, setIsLoading } = useContext(ResponseContext);

	const change = (name: string, value: string | unknown) => {
		const tempParams = { ...params };

		tempParams[name] =
			typeof value === 'string' || typeof value === 'number' ? value : ''; // TODO: seems wrong

		setParams(tempParams);
	};

	const renderFields = () => {
		return fields.map((param) => {
			const { name, required, type, options } = param;
			return (
				<div key={`${request}-${name}`} style={{ marginTop: '.5em' }}>
					{type === 'select' ? (
						<>
							<InputLabel id={`${name}-label`}>{name}</InputLabel>
							<Select
								style={{ width: 300 }}
								labelId={`${name}-label`}
								id={`${name}-select`}
								value={params[name]}
								margin="dense"
								onChange={(e) => {
									change(name, e.target.value);
								}}
							>
								<MenuItem value={''}></MenuItem>
								{options?.map((op) => (
									<MenuItem key={`${op}-${name}`} value={op}>
										{op}
									</MenuItem>
								))}
							</Select>
						</>
					) : (
						<TextField
							id={`${request}-${name}`}
							label={name}
							margin="dense"
							required={required}
							type={type}
							style={{ width: 300 }}
							onChange={(e) => {
								change(name, e.target.value);
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

		const postParams: { [key: string]: string | number } = {};

		Object.keys(params).forEach((key) => {
			const value = params[key];
			if (value !== '') {
				const type = fields.find((el) => el.name === key);

				postParams[key] = type?.type === 'number' ? Number(value) : value;
			}
		});
		const body = {
			user,
			request,
			...postParams,
		};
		const response = await api[apiField].generic(body);
		setIsLoading(false);

		const responseObj: ResponseI = {
			user,
			request,
			time: +new Date() / 1000,
			response,
			error:
				'records' in response.data
					? response.data.status.responseStatus === 'error'
					: response.data.error?.code > 0 || true,
		};
		addResponse(responseObj);
	};

	const addToFavorites = () => {
		const { request } = requestObj;
		setIsFavorite(PluginStorage.toggleFav(request));
	};

	return (
		<div className={classes.root}>
			<form onSubmit={sendRequest}>
				<Accordion
					expanded={
						requestObj.fields && requestObj.fields.length > 0
							? undefined
							: false
					}
				>
					<AccordionSummary
						expandIcon={
							requestObj.fields && requestObj.fields.length > 0 ? (
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
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<StarRateIcon
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										addToFavorites();
									}}
									style={{ color: isFavorite ? 'gold' : '#a1a1a1' }}
								/>
								{request}
							</div>
						</Typography>
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
