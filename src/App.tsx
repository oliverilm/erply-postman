import './App.css';

import React, { useState } from 'react';

import { UserI } from './@interfaces';
import PluginStorage from './api/storage';
import { UserList } from './components/UserList';
import { UsersListContext } from './context/index';

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

		const correct = list.find((u) => u === user);
		if (!correct) return;

		correct.selected = true;

		setSelectedUser(correct);
		setUserList(list);
	};

	const updateUser = (user: UserI) => {
		const oldList = usersList;

		const result = oldList.map(
			(obj) => [user].find((o) => o.id === obj.id) || obj
		);
		PluginStorage.setUsers(result);
		setUsersList(PluginStorage.getUsers());
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
			}}
		>
			<UserList userList={usersList} />
		</UsersListContext.Provider>
	);
};

export default App;
