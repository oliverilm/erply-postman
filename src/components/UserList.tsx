/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserI } from '../@interfaces';
import { ResponseContext, UsersListContext } from '../context/index';
import './modalStyle.css';
import UserManager from '../api/user';
import {
	Divider,
	FormControl,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { Button } from './custom/Button';
import { generatePostmanProfile } from './requests/scripts/postman';
import UserDetailModal from './UserDetail';
import { v4 as uuidv4 } from 'uuid';

const ListCard = styled.div`
	border-radius: 5px;
	border: 1px solid #ccc;
	margin: 0.5em 0.25em;
	min-height: 4em;
	width: 14em;
`;

const ListCardContent = styled.div`
	padding: 0.5em;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ListCardRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	color: #c0c0c0;
	font-size: 12px;
`;

interface ListItemProps {
	user: UserI;
}

interface TimeI {
	hours: number;
	minutes: number;
	seconds: number;
}

const UserListItem: React.FC<ListItemProps> = ({ user }) => {
	const { clientCode, username, selected } = user;
	const { setSelectedUser, updateUser } = useContext(UsersListContext);
	const userManager = new UserManager(user);
	const [timeTilEnd, setTimeTilEnd] = useState<TimeI | null>(null);
	const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
	const { addResponse, setIsLoading } = useContext(ResponseContext);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeTilEnd(timeUntilAuthEnd());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [user]);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const selectUser = () => {
		setSelectedUser(user);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const isAuthenticated = () => {
		return userManager.isAuthenticated();
	};

	const timeUntilAuthEnd = () => {
		const endDate = userManager.authEndTime();
		const currentDate = new Date();
		if (endDate) {
			const distance = endDate.getTime() - currentDate.getTime();
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			return { hours, minutes, seconds };
		}
		return null;
	};

	const login = async () => {
		setIsLoading(true);

		handleClose();
		const { user, response } = await userManager.login();
		addResponse({
			request: 'verifyUser',
			response,
			error: response.data.status.errorCode > 0,
			user,
			time: +new Date() / 1000,
		});
		updateUser(user);
		setIsLoading(false);
	};

	const formatNr = (nr: number | undefined) => {
		if (nr === undefined) return ' -- ';
		return (nr ?? 0).toString().padStart(2, '0');
	};

	return (
		<>
			<ListCard
				className={`user-card ${selected ? 'selected' : ''}`}
				onDoubleClick={selectUser}
			>
				<ListCardContent style={{ flex: 1, minHeight: '3em' }}>
					<ListCardRow
						style={{ alignItems: 'flex-start' }}
						className={'user-card-detail'}
					>
						<div>
							{clientCode} - {username}
						</div>
						<div>
							{isAuthenticated() ? (
								<div>{`${formatNr(timeTilEnd?.hours)}:${formatNr(
									timeTilEnd?.minutes
								)}:${formatNr(timeTilEnd?.seconds)}`}</div>
							) : (
								<BlockIcon color="error" />
							)}
						</div>
					</ListCardRow>
					<ListCardRow
						style={{ alignItems: 'flex-end' }}
						className={'user-card-session'}
					>
						<div>
							{user.credentials?.sessionKey.substr(0, 15) ?? 'xxxxxxxxxxxxxxx'}
						</div>
						<div
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
						>
							options &gt;
						</div>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={login}>Authenticate</MenuItem>
							<MenuItem
								onClick={() => {
									setIsViewOpen(true);
									handleClose();
								}}
							>
								Profile Details
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
									generatePostmanProfile(user);
								}}
							>
								Postman Profile
							</MenuItem>
						</Menu>
					</ListCardRow>
				</ListCardContent>
			</ListCard>
			<UserDetailModal
				onClose={() => {
					setIsViewOpen(false);
				}}
				open={isViewOpen}
				user={user}
			/>
		</>
	);
};

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
					{userList.map((user, index) => (
						<UserListItem key={index} user={user} />
					))}
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<FormControl>
					<Input
						type="text"
						onChange={changeClientcode}
						placeholder="clientCode"
					/>
					<Input type="text" onChange={changeUsername} placeholder="username" />
					<Input
						type="password"
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
