/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserI } from '../@interfaces';
import { UsersListContext } from '../context/index';
import Modal from './Modal';
import './modalStyle.css';
import UserManager from '../api/user';
import { Menu, MenuItem } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

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
	const { setSelectedUser, updateUser, deleteUser } = useContext(
		UsersListContext
	);
	const userManager = new UserManager(user);
	const [timeTilEnd, setTimeTilEnd] = useState<TimeI | null>(null);

	useEffect(() => {
		if (user.credentials !== null) {
			setInterval(() => {
				setTimeTilEnd(timeUntilAuthEnd());
			}, 1000);
		} else {
			updateUser({ ...user, credentials: null });
		}
	}, []);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

	const deleteThisUser = () => {
		handleClose();
		deleteUser(user);
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
		handleClose();
		const updatedUser = await userManager.login();
		updateUser(updatedUser);
	};

	const formatNr = (nr: number | undefined) => {
		if (nr === undefined) return ' -- ';
		return (nr ?? 0).toString().padStart(2, '0');
	};

	return (
		<ListCard
			className={`user-card ${selected ? 'selected' : ''}`}
			onDoubleClick={selectUser}
		>
			<ListCardContent>
				<ListCardRow className={'user-card-detail'}>
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
				<ListCardRow className={'user-card-session'}>
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
						<MenuItem onClick={handleClose}>Edit Profile</MenuItem>
						<MenuItem onClick={handleClose}>View Details</MenuItem>
						<MenuItem onClick={deleteThisUser}>Delete</MenuItem>
					</Menu>
				</ListCardRow>
			</ListCardContent>
		</ListCard>
	);
};

interface UserListProps {
	userList: UserI[];
}

export const UserList: React.FC<UserListProps> = ({ userList }) => {
	return (
		<div style={{ padding: '1em' }}>
			<div style={{ margin: '1em 0px', width: '100%' }}>
				<Modal />
			</div>
			{userList.map((user, index) => (
				<UserListItem key={index} user={user} />
			))}
		</div>
	);
};
