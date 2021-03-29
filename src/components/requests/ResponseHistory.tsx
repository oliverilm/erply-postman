import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { ResponseContext } from '../../context';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface ResponseHistoryProps {}

const ResponseHistory: React.FC<ResponseHistoryProps> = (): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const { responses } = useContext(ResponseContext);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const renderResponses = () => {
		return responses.map((resp) => {
			return <div key={resp.request}>{resp.request}</div>;
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
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Previous request history'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{renderResponses()}
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
