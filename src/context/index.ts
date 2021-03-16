/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { UserI } from '../@interfaces';

interface UserContext {
	usersList: UserI[];
	selectedUser: UserI | null | undefined;
	setUsersList: (arr: UserI[]) => any;
	setSelectedUser: (user: UserI) => any;
	addUser: (user: UserI) => any;
	updateUser: (user: UserI) => any;
	deleteUser: (user: UserI) => any;
}

interface ResponseI {
	user: UserI;
	request: string;
	time: number;
	response: any;
	error: boolean;
}
interface ResponseContextI {
	responses: ResponseI[];
	setResponses: (arr: ResponseI[]) => any;
	addResponse: (res: ResponseI) => any;
}

export const UsersListContext = React.createContext<UserContext>({
	usersList: [],
	selectedUser: null,
	setUsersList: (value: UserI[]) => {
		return;
	},
	setSelectedUser: (value: UserI) => {
		return;
	},
	addUser: (user: UserI) => {
		return;
	},
	updateUser: (user: UserI) => {
		return;
	},
	deleteUser: (user: UserI) => {
		return;
	},
});

export const StorageContext = React.createContext({
	storage: null,
	setStorage: () => {
		return;
	},
});

export const ResponseContext = React.createContext<ResponseContextI>({
	responses: [],
	setResponses: (arr: ResponseI[]) => {
		return;
	},
	addResponse: (res: ResponseI) => {
		return;
	},
});
