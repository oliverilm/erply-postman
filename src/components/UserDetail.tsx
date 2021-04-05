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
import { Table, Tbody, Td, Tr } from './custom/Table';
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
		e.persist();
		console.log(e.target.value);
		setTempUser(() => {
			tempUser.username = e.target.value;
			return { ...tempUser };
		});
	};

	const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setTempUser(() => {
			tempUser.password = e.target.value;
			return { ...tempUser };
		});
	};

	const updateClientCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
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
				<Table>
					<Tbody>
						<Tr>
							<Td>username</Td>
							<Td>
								{isEdit ? (
									<TextField
										value={tempUser.username}
										onChange={updateUsername}
									/>
								) : (
									<div>{tempUser.username}</div>
								)}
							</Td>
						</Tr>
						<Tr>
							<Td>clientCode</Td>
							<Td>
								{isEdit ? (
									<TextField
										onChange={updateClientCode}
										value={tempUser.clientCode}
									/>
								) : (
									<div>{tempUser.clientCode}</div>
								)}
							</Td>
						</Tr>
						<Tr>
							<Td>password</Td>
							<Td>
								{isEdit ? (
									<TextField
										onChange={updatePassword}
										value={tempUser.password}
									/>
								) : (
									<div>{tempUser.password}</div>
								)}
							</Td>
						</Tr>
					</Tbody>
				</Table>
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
