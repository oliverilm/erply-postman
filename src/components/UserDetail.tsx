import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Table,
	Button,
	TableBody,
	TableCell,
	TableRow,
	makeStyles,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { UserI } from '../@interfaces';
import { UsersListContext } from '../context';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import { jsonDisplay } from '../utils';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PluginStorage from '../api/storage';

const useStyles = makeStyles({
	table: {
		minWidth: '50%',
		maxWidth: 400,
	},
});

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
	const { updateUser, deleteUser } = useContext(UsersListContext);
	const [tempUser, setTempUser] = useState<UserI>({ ...user });
	const [isEdit, setIsEdit] = useState(edit);
	const classes = useStyles();
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

	const deleteThisUser = (): void => {
		deleteUser(user);
		handleClose();
	};

	const updateCompany = (e: string) => {
		// update user company
		setTempUser(() => {
			tempUser.company = e;
			return { ...tempUser };
		});
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
				<Table className={classes.table} aria-label="simple table">
					<TableBody>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell align="left">
								{isEdit ? (
									<TextField
										value={tempUser.username}
										onChange={updateUsername}
									/>
								) : (
									tempUser.username
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Client Code</TableCell>
							<TableCell align="left">
								{isEdit ? (
									<TextField
										value={tempUser.clientCode}
										onChange={updateClientCode}
									/>
								) : (
									tempUser.clientCode
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Password</TableCell>
							<TableCell align="left">
								{isEdit ? (
									<TextField
										value={tempUser.password}
										onChange={updatePassword}
									/>
								) : (
									tempUser.password
								)}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Company</TableCell>
							<TableCell align="left">
								{isEdit ? (
									<Autocomplete
										options={PluginStorage.companySelection() || []}
										getOptionLabel={(el) => el}
										style={{ width: 300 }}
										freeSolo
										value={tempUser.company || ''}
										inputValue={tempUser.company || ''}
										onInputChange={(e, newVal) => {
											updateCompany(newVal);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												margin="dense"
												label={'Company'}
												value={tempUser.company || ''}
												onChange={(e) => {
													updateCompany(e.target.value);
												}}
											/>
										)}
									/>
								) : tempUser.company ? (
									tempUser.company
								) : (
									'No company'
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<pre
					style={{ backgroundColor: '#fefefe' }}
					dangerouslySetInnerHTML={{
						__html: jsonDisplay.outputPretty(
							JSON.stringify({
								credentials: user.credentials,
								endpoints: user.endpoints,
							})
						),
					}}
				></pre>
			</DialogContent>
			<DialogActions>
				{isEdit ? (
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<Button onClick={deleteThisUser} color="primary">
								Delete
							</Button>
						</div>
						<div>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={update} color="primary">
								Save
							</Button>
						</div>
					</div>
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
