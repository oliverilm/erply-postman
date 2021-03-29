import axios from 'axios';

const customer = axios.create();

customer.interceptors.request.use((request) => {
	const formData = new FormData();

	request.headers['content-type'] = 'application/x-www-form-urlencoded';
	request.headers['Customer-Registry-JWT'] = request.data.jwt;
	request.headers['Erply-Api-Client-Code'] = request.data.clientCode;
	request.headers['Erply-Api-Session-Key'] = request.data.sessionKey;

	formData.append(`api[path]`, request.data.request);
	formData.append(`api[jwt]`, request.data.jwt);

	delete request.data.request;
	delete request.data.sessionKey;
	delete request.data.clientCode;
	delete request.data.jwt;

	Object.keys(request.data).forEach((key) => {
		formData.append(`parameters[${key}]`, request.data[key]);
	});

	request.data = formData;

	return request;
});

customer.interceptors.response.use((response) => {
	return response;
});

export default customer;
