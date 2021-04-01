import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { UserI } from '../@interfaces';
import { UsersListContext } from '../context';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
interface UserDetailProps {
	edit?: boolean;
	user: UserI;
	onClose: () => void;
	open: boolean;
}

const UserDetailModal: React.FC<UserDetailProps> = ({
	open,
	onClose,
	edit = false,
	user,
}): JSX.Element => {
	const { updateUser } = useContext(UsersListContext);
	const [tempUser, setTempUser] = useState<UserI>({ ...user });
	const [isEdit, setIsEdit] = useState(edit);

	const update = () => {
		// update user
		updateUser(tempUser);
		setIsEdit(false);
		handleClose();
	};

	const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempUser(() => {
			tempUser.username = e.target.value;
			return { ...tempUser };
		});
	};

	const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempUser(() => {
			tempUser.password = e.target.value;
			return { ...tempUser };
		});
	};

	const updateClientCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempUser(() => {
			tempUser.clientCode = e.target.value;
			return { ...tempUser };
		});
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
			<DialogTitle id="form-dialog-title">
				<div
					style={{
						minWidth: '40vw',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<div>{isEdit ? 'Update User' : 'User Detail'}</div>
					<div>
						{isEdit ? (
							<div>
								<ClearIcon
									style={{ cursor: 'pointer' }}
									onClick={() => {
										setIsEdit(false);
									}}
								/>
							</div>
						) : (
							<div>
								<CreateIcon
									style={{ cursor: 'pointer' }}
									onClick={() => {
										setIsEdit(true);
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</DialogTitle>
			<DialogContent>
				<table>
					<tbody>
						<tr>
							<td>username</td>
							<td>
								{isEdit ? (
									<TextField
										value={tempUser.username}
										onChange={updateUsername}
									/>
								) : (
									tempUser.username
								)}
							</td>
						</tr>
						<tr>
							<td>clientCode</td>
							<td>
								{isEdit ? (
									<TextField
										onChange={updateClientCode}
										value={tempUser.clientCode}
									/>
								) : (
									tempUser.clientCode
								)}
							</td>
						</tr>
						<tr>
							<td>password</td>
							<td>
								{isEdit ? (
									<TextField
										onChange={updatePassword}
										value={tempUser.password}
									/>
								) : (
									tempUser.password
								)}
							</td>
						</tr>
					</tbody>
				</table>
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
