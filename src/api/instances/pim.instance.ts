/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { UserI } from '../../@interfaces';

const pim = axios.create();

pim.interceptors.request.use((request) => {
	return request;
});

pim.interceptors.response.use((response) => {
	return response;
});

export const addHeaders = (user: UserI): void => {
	pim.defaults.headers.common['sessionKey'] =
		user.credentials?.sessionKey || '';
	pim.defaults.headers.common['clientCode'] = user.clientCode;
	pim.defaults.baseURL = user.endpoints?.cafa?.url || '';
};

export default pim;
