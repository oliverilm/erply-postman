/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { UserI } from '../@interfaces';
import './modalStyle.css';
import { Divider, FormControl, Typography } from '@material-ui/core';
import { Button } from './custom/Button';
import { v4 as uuidv4 } from 'uuid';
import UserGroups from './UserGroups';
import { UsersListContext } from '../context';

interface UserListProps {
	userList: UserI[];
}

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.5em;
	letter-spacing: 2px;
	margin: 0.1em;
	text-align: center;
	width: 200px;
	margin-bottom: 0.3em;
`;

export const UserList: React.FC<UserListProps> = ({ userList }) => {
	const [clientCode, setClientCode] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const { addUser } = useContext(UsersListContext);

	const isValid = clientCode && userName && password;

	const addNewUser = () => {
		if (clientCode && userName && password) {
			const newUser: UserI = {
				id: uuidv4(),
				selected: true,
				username: userName,
				clientCode,
				password,
				sessionKey: null,
				lastLogin: 0,
				credentials: null,
				endpoints: null,
			};
			addUser(newUser);
		}
	};

	const changeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUserName(e?.target.value || '');
	};

	const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e?.target.value || '');
	};

	const changeClientcode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClientCode(e?.target.value || '');
	};

	/**
	 * TODO: move this somewhere out of the component
	 */
	const getGroupedAccounts = (): { [key: string]: UserI[] } => {
		const groups: { [key: string]: UserI[] } = {};

		userList.forEach((user) => {
			if (!user.company || user.company === '') {
				if (groups.General) {
					groups.General.push(user);
				} else {
					groups.General = [user];
				}
			} else {
				if (groups[user.company]) {
					groups[user.company].push(user);
				} else {
					groups[user.company] = [user];
				}
			}
		});
		console.log(groups);
		return groups;
	};

	return (
		<div
			style={{
				padding: '1em',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				borderRight: '1px solid #ccc',
				marginRight: '1em',
			}}
		>
			<div>
				<Typography component={'span'} variant="h6">
					Profiles
				</Typography>
				<Divider />
				<br />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						height: '70vh',
					}}
				>
					<UserGroups groups={getGroupedAccounts()} />
					{/* {userList.map((user, index) => (
						<UserListItem key={index} user={user} />
					))} */}
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<FormControl>
					<Input
						required
						type="text"
						onChange={changeClientcode}
						placeholder="clientCode"
					/>
					<Input
						required
						type="text"
						onChange={changeUsername}
						placeholder="username"
					/>
					<Input
						type="password"
						required
						onChange={changePassword}
						placeholder="password"
					/>

					<Button
						style={{
							cursor: isValid ? 'pointer' : 'not-allowed',
							pointerEvents: isValid ? 'all' : 'none',
						}}
						type={'submit'}
						variant={!isValid ? 'error' : 'primary'}
						onClick={addNewUser}
					>
						{isValid ? 'Add user' : 'Please fill all fields'}
					</Button>
				</FormControl>
			</div>
		</div>
	);
};
