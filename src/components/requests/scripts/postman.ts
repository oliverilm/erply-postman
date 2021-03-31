import { UserI } from '../../../@interfaces';
import { v4 as uuidv4 } from 'uuid';
import UserManager from '../../../api/user';

export interface PostmanProfileValueI {
	key: string;
	value: string;
	enabled: boolean;
}

export interface PostmanProfileI {
	id: string;
	name: string;
	values: PostmanProfileValueI[];
	_postman_variable_scope: 'environment';
	_postman_exported_at: string;
	_postman_exported_using: 'Postman/7.36.5';
}

const generateValues = (user: UserI): PostmanProfileValueI[] => {
	if (!user) return [];

	const um = new UserManager(user);

	return [
		{
			key: 'customerRegistryUrl',
			value: '',
			enabled: true,
		},
		{
			key: 'customerRegistryToken',
			value: '',
			enabled: true,
		},
		{
			key: 'sessionKey',
			value: user.credentials?.sessionKey || '',
			enabled: true,
		},
		{
			key: 'clientCode',
			value: user.clientCode || '',
			enabled: true,
		},
		{
			key: 'username',
			value: user.username || '',
			enabled: true,
		},
		{
			key: 'password',
			value: user.password || '',
			enabled: true,
		},
	];
};

export const generatePostmanProfile = (user: UserI): void => {
	const fileName = `${user.clientCode}.postman_environment.json`;

	const result: PostmanProfileI = {
		id: uuidv4(),
		name: user.clientCode?.toString() || 'No clientCode Provided',
		values: generateValues(user),
		_postman_variable_scope: 'environment',
		_postman_exported_at: new Date().toUTCString(),
		_postman_exported_using: 'Postman/7.36.5',
	};
	const fileContent = new Blob([JSON.stringify(result)], {
		type: 'application/json',
	});
	const url = URL.createObjectURL(fileContent);

	const element = document.createElement('a');
	element.href = url;
	element.download = fileName;
	element.click();
};
