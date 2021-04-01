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

	const updateUsername = (value: string) => {
		setTempUser(() => {
			tempUser.username = value;
			return { ...tempUser };
		});
	};

	const updatePassword = (value: string) => {
		setTempUser(() => {
			tempUser.password = value;
			return { ...tempUser };
		});
	};

	const updateClientCode = (value: string) => {
		setTempUser(() => {
			tempUser.clientCode = value;
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
										onChange={(e) => {
											updateUsername(e.target.value);
										}}
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
										onChange={(e) => {
											updateClientCode(e.target.value);
										}}
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
										onChange={(e) => {
											updatePassword(e.target.value);
										}}
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
