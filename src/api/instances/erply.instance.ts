import axios from 'axios';

const erply = axios.create();

erply.interceptors.request.use((request) => {
	const formData = new FormData();

	Object.keys(request.data).forEach((key) => {
		formData.append(key, request.data[key]);
	});

	request.data = formData;
	request.headers['content-type'] = 'application/x-www-form-urlencoded';

	return request;
});

erply.interceptors.response.use((response) => {
	return response;
});

export default erply;
