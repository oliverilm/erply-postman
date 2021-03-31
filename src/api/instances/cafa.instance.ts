/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { UserI } from '../../@interfaces';

const cafa = axios.create();

cafa.interceptors.request.use((request) => {
	return request;
});

cafa.interceptors.response.use((response) => {
	return response;
});

export const addHeaders = (user: UserI): void => {
	cafa.defaults.headers.common['sessionKey'] =
		user.credentials?.sessionKey || '';
	cafa.defaults.headers.common['clientCode'] = user.clientCode;
	cafa.defaults.baseURL = user.endpoints?.cafa.url || '';
};

export const getUrl = (url: string, content: any): string => {
	return `${url}?${Object.keys(content)
		.map((key) => {
			const value = content[key];
			if (value) {
				return `${key}=${value}`;
			}
		})
		.filter((el) => el !== undefined)
		.join('&')}`;
};

export default cafa;
