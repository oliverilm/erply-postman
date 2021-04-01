import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { UserI } from '../@interfaces';
import { UsersListContext } from '../context';

interface UserDetailProps {
	edit?: boolean;
	user: UserI;
	onClose: () => void;
	open: boolean;
}

const UserDetailModal: React.FC<UserDetailProps> = ({
	edit = false,
	open,
	onClose,
	user,
}): JSX.Element => {
	const { updateUser } = useContext(UsersListContext);
	const [showPassword, setShowPassword] = useState(false);
	const [tempUser, setTempUser] = useState<UserI>(user);
	const [isEdit, setIsEdit] = useState(edit);

	const update = () => {
		// update user

		handleClose();
	};

	const handleClose = (): void => {
		onClose && onClose();
	};

	return (
		<Dialog
			maxWidth={'lg'}
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title" style={{ minWidth: '40vw' }}>
				{isEdit ? 'Update User' : 'User Detail'}
			</DialogTitle>
			<DialogContent>
				{isEdit ? (
					<>
						<TextField
							autoFocus
							margin="dense"
							id="clientCode"
							label="clientCode"
							value={user.clientCode}
							type="text"
						/>
						<TextField
							autoFocus
							margin="dense"
							id="Username"
							value={user.username}
							label="Username"
							type="text"
						/>
						<TextField
							autoFocus
							margin="dense"
							id="Password"
							value={user.password}
							label="Password"
							type="password"
						/>
					</>
				) : (
					<>test</>
				)}
			</DialogContent>
			<DialogActions>
				{isEdit ? (
					<>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={update} color="primary">
							Save
						</Button>
					</>
				) : (
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default UserDetailModal;
