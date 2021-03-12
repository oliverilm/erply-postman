import React from 'react';
import { UserI } from '../@interfaces';
import { defaultUser } from '../api/user';

export const UsersListContext = React.createContext({
	usersList: [defaultUser],
	selectedUser: defaultUser,
	setUsersList: (value: UserI[]) => {
		return;
	},
	setSelectedUser: (value: UserI) => {
		return;
	},
});

export const StorageContext = React.createContext({
	storage: null,
	setStorage: () => {
		return;
	},
});
