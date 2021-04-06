import './App.css';

import React, { useState } from 'react';

import { ResponseI, UserI } from './@interfaces';
import PluginStorage from './api/storage';
import { UserList } from './components/UserList';
import { UsersListContext, ResponseContext } from './context/index';
import RequestList from './components/requests/RequestList';
import styled from 'styled-components';
import ResponseList from './components/requests/ResponseList';

const Row = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	max-width: 100vw;
	max-height: 100vh;
`;

const App: React.FC = () => {
	const [usersList, setUsersList] = useState<UserI[]>(PluginStorage.getUsers());
	const [selectedUser, setSelectedUser] = useState<UserI | null | undefined>();

	const setUserList = (users: UserI[]): void => {
		PluginStorage.setUsers(users);
		setUsersList(users);
	};

	const addUser = (user: UserI) => {
		// add a new user and update storage.
		const oldList = usersList;
		oldList.forEach((u) => {
			u.selected = false;
		});
		const newList = [user, ...oldList];

		PluginStorage.setUsers(newList);
		setUsersList(PluginStorage.getUsers());
	};

	const selectUser = (user: UserI) => {
		if (usersList === undefined) return;
		const list = usersList;
		list.forEach((users) => (users.selected = false));

		const correct = list.find((u) => u.id === user.id);
		if (!correct) return;

		correct.selected = true;

		setSelectedUser(correct);
		setUserList(list);
	};

	const updateUser = (user: UserI) => {
		const result = usersList.map(
			(obj) => [user].find((o) => o.id === obj.id) || obj
		);
		PluginStorage.setUsers(result);
		setUsersList(PluginStorage.getUsers());
	};

	const deleteUser = (user: UserI) => {
		const newList = usersList.filter((u) => u.id !== user.id);

		PluginStorage.setUsers(newList);
		setUsersList(PluginStorage.getUsers());
	};

	const [responses, setResponses] = useState<ResponseI[]>(
		PluginStorage.getResponses()
	);
	const [isLoading, setIsLoading] = useState(false);

	const setResponsesToArr = (responses: ResponseI[]) => {
		setResponses(responses);
	};

	const addResponse = (response: ResponseI) => {
		const newResponses = [response, ...responses];
		PluginStorage.setResponses(newResponses);
		setResponses(PluginStorage.getResponses());
	};

	return (
		<UsersListContext.Provider
			value={{
				usersList,
				selectedUser,
				setUsersList: setUserList,
				setSelectedUser: selectUser,
				addUser,
				updateUser,
				deleteUser,
			}}
		>
			<ResponseContext.Provider
				value={{
					responses,
					setResponses: setResponsesToArr,
					addResponse,
					isLoading,
					setIsLoading,
				}}
			>
				<Row>
					<UserList userList={usersList} />
					<RequestList />
					<ResponseList />
				</Row>
			</ResponseContext.Provider>
		</UsersListContext.Provider>
	);
};

export default App;
