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

export default cafa;
