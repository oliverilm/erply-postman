/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserI } from '../@interfaces';
import { UsersListContext } from '../context/index';
import Modal from './Modal';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import api from '../api/index';
import './modalStyle.css';

const ListCard = styled.div`
	border-radius: 5px;
	border: 1px solid #ccc;
	margin: 0.5em 0.25em;
	min-height: 3em;
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

const UserListItem: React.FC<ListItemProps> = ({ user }) => {
	const { clientCode, username, sessionKey, selected } = user;
	const [hover, setHover] = useState(false);
	const { setSelectedUser } = useContext(UsersListContext);

	// TODO: Style this and make the user selection work.
	const selectUser = () => {
		setSelectedUser(user);
	};

	const login = () => {
		api.verifyUser(user).then((res) => {
			console.log(res);
		});
	};

	return (
		<ListCard
			className={`user-card ${selected ? 'selected' : ''}`}
			onDoubleClick={selectUser}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			<ListCardContent>
				<ListCardRow className={'user-card-detail'}>
					<div>
						{clientCode} - {username}
					</div>
					<div>
						<VpnKeyIcon style={{ color: '#333' }} onClick={login} />
					</div>
				</ListCardRow>
				<ListCardRow className={'user-card-session'}>
					{sessionKey || 'XXXXXXXXXXXXXXX'}
				</ListCardRow>
			</ListCardContent>
		</ListCard>
	);
};

export const UserList: React.FC = () => {
	const context = useContext(UsersListContext);
	const { usersList } = context;

	return (
		<div style={{ width: '430px', padding: '1em' }}>
			<div style={{ marginBottom: '2em' }}>
				<Modal />
			</div>
			{usersList
				.filter((user) => !user.selected)
				.map((user, index) => (
					<UserListItem key={index} user={user} />
				))}
		</div>
	);
};
