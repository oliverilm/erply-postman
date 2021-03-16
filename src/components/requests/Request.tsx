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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useState } from 'react';
import api from '../../api';
import { UsersListContext } from '../../context';
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
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		icon: {
			verticalAlign: 'bottom',
			height: 20,
			width: 20,
		},
		details: {
			alignItems: 'center',
		},
		column: {
			flexBasis: '33.33%',
		},
		helper: {
			borderLeft: `2px solid ${theme.palette.divider}`,
			padding: theme.spacing(1, 2),
		},
		link: {
			color: theme.palette.primary.main,
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline',
			},
		},
	})
);

interface Props {
	requestObj: RequestI;
}
const Request: React.FC<Props> = ({ requestObj }): JSX.Element => {
	const { title, request, fields, description } = requestObj;
	const classes = useStyles();
	const [params, setParams] = useState<RequestContent[]>(fields);
	const { usersList } = useContext(UsersListContext);

	const renderFields = () => {
		return '';
	};

	const requestEnabled = () => {
		const user = usersList.find((u) => u.selected);
		if (user === undefined) return false;
		return true;
	};

	const sendRequest = async () => {
		const user = usersList.find((u) => u.selected);
		if (!user) return;
		const body = {
			user,
			request,
		};
		const response = await api.generic(body);
		// do something with response.
		// handle errors and response
		console.log(response);
		// do a post request to the erply api endpoint
	};

	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1c-content"
					id="panel1c-header"
				>
					<Typography className={classes.heading}>{request}</Typography>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					{description}
				</AccordionDetails>
				<Divider />
				<AccordionActions>
					<Button
						disabled={!requestEnabled()}
						size="small"
						color="primary"
						onClick={sendRequest}
					>
						Send Request
					</Button>
				</AccordionActions>
			</Accordion>
		</div>
	);
};

export default Request;
