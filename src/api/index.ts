import axios from 'axios';
import { BaseRequestResponse, CredentialsI, UserI } from '../@interfaces';

axios.interceptors.request.use((request) => {
	const formData = new FormData();

	Object.keys(request.data).forEach((key) => {
		formData.append(key, request.data[key]);
	});

	request.data = formData;
	request.headers['content-type'] = 'application/x-www-form-urlencoded';

	return request;
});

axios.interceptors.response.use((response) => {
	return response;
});

const spreadUser = (user: UserI) => {
	const { sessionKey, clientCode, username, password } = user;

	return { sessionKey, clientCode, username, password };
};

export default {
	verifyUser: ({
		clientCode,
		username,
		password,
	}: UserI): Promise<BaseRequestResponse<CredentialsI>> => {
		const body = {
			request: 'verifyUser',
			clientCode,
			username,
			password,
		};
		return axios.post(`https://${clientCode}.erply.com/api/`, body);
	},
};
