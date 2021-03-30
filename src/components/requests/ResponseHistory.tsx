import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { ResponseContext } from '../../context';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styled from 'styled-components';
import { ResponseI } from '../../@interfaces';
import translateError from '../../api/errors';
import PublishIcon from '@material-ui/icons/Publish';

interface ResponseHistoryProps {}

const Table = styled.table`
	border-collapse: collapse;
	min-width: 540px;
	border: 1px solid #7f8c8d;
`;

const Td = styled.td`
	padding: 5px;
	border: 1px solid #7f8c8d;
`;

const LoadResponse = styled.span`
	position: absolute;

	right: 5px;
	color: red;
`;

const ResponseHistory: React.FC<ResponseHistoryProps> = (): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const { responses } = useContext(ResponseContext);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleResponseContentDisplay = (response: ResponseI) => {
		if ('records' in response.response.data) {
			// ERPLY API RESPONSE
			if (response.error === false) {
				return JSON.stringify(response.response.data.records).substr(0, 100);
			}
			// return response error message and or code
			const errorCode = response.response.data.status.errorCode;
			const errorMessage = translateError(errorCode);

			return `${errorCode} - ${errorMessage}`;
		} else {
			// CUSTOMER API RESPONSE
			if (response.error === false) {
				return JSON.stringify(response.response.data.result).substr(0, 100);
			}
			// return response error message and or code

			const errorCode = response.response.data.error?.code || '';
			const errorMessage = response.response.data.error?.message || '';
			return `${errorCode} - ${errorMessage}`;
		}
	};

	const loadResponse = (response: ResponseI) => {
		// load response to dashboard
	};

	const renderResponses = () => {
		return responses.map((resp, i) => {
			return (
				<tr key={`${i}-response`}>
					<Td>{resp.request}</Td>
					<Td>{resp.user.clientCode}</Td>
					<Td>{resp.response.status}</Td>
					<Td>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							{handleResponseContentDisplay(resp)}{' '}
							<PublishIcon
								titleAccess="Load to dashboard"
								onClick={() => {
									loadResponse(resp);
								}}
								style={{ marginLeft: '1em', cursor: 'pointer' }}
							/>
						</div>
					</Td>
				</tr>
			);
		});
	};

	return (
		<div>
			<MoreHorizIcon
				onClick={handleClickOpen}
				className={'more'}
				style={{ fontSize: '2.5em', cursor: 'pointer' }}
			/>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth={'xl'}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Previous request history'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Table>
							<thead>
								<tr>
									<Td>Request</Td>
									<Td>clientCode</Td>
									<Td>Status</Td>
									<Td>Response</Td>
								</tr>
							</thead>
							<tbody>{renderResponses()}</tbody>
						</Table>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" autoFocus>
						close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ResponseHistory;
