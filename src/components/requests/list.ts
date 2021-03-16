export interface RequestContent {
	name: string;
	required: boolean;
	type: 'string' | 'number';
	helper?: string;
}

export interface RequestI {
	request: string;
	title?: string;
	description?: string;
	fields: RequestContent[];
}
export const requests: RequestI[] = [
	{
		request: 'saveConfParameter',
		title: 'Save config parameter',
		fields: [
			{ name: 'parameterName', required: true, type: 'string' },
			{ name: 'parameterValue', required: true, type: 'string' },
		],
	},

	{
		request: 'getConfParameters',
		title: 'Get Config Parameters',
		fields: [],
	},

	{
		request: 'getEmployees',
		title: 'get a specific or a list of employees',
		fields: [
			{ name: 'employeeID', required: false, type: 'number' },
			{ name: 'searchName', required: false, type: 'string' },
			{ name: 'userGroupID', required: false, type: 'number' },
			{ name: 'usernameOrEmail', required: false, type: 'number' },
			{ name: 'warehouseID', required: false, type: 'number' },
		],
	},
];
