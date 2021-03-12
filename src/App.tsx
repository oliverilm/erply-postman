import './App.css';

import React, { useEffect, useState } from 'react';

import { UserI } from './@interfaces';
import PluginStorage from './api/storage';
import { defaultUser } from './api/user';
import { UserList } from './components/UserList';
import { UsersListContext } from './context/index';

const App: React.FC = () => {
	const [usersList, setUsersList] = useState<UserI[]>([defaultUser]);
	const [selectedUser, setSelectedUser] = useState<UserI>(defaultUser);

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			const users = PluginStorage.getUsers();
			const selected = users.find((user) => user.selected) || users[0];

			setUsersList(users);
			setSelectedUser(selected);
		}
		return () => {
			mounted = false;
		};
	}, []);

	const setUserList = (users: UserI[]): void => {
		PluginStorage.setUsers(users);
		setUsersList(users);
	};

	const selectUser = (user: UserI) => {
		if (usersList === undefined) return;
		const list = usersList;
		list.forEach((users) => (users.selected = false));

		const correct = list.find((u) => u === user);
		if (!correct) return;

		correct.selected = true;

		console.log(list);
		setUserList(list);
	};

	return (
		<div className="App">
			<UsersListContext.Provider
				value={{
					usersList,
					selectedUser,
					setUsersList: setUserList,
					setSelectedUser: selectUser,
				}}
			>
				<UserList />
			</UsersListContext.Provider>
		</div>
	);
};

export default App;
