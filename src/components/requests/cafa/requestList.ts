export interface CafaRequestFieldI {
	name: string;
	type: 'select' | 'string' | 'number';
	required?: boolean;
	options?: string[];
}

export interface CafaRequestI {
	request: string;
	apiFunction: string;
	fields?: CafaRequestFieldI[];
}

const mainFields: CafaRequestFieldI[] = [
	{
		name: 'application',
		type: 'select',
		required: true,
		options: [], // will be populated after getApplications api call.
	},
	{
		name: 'level',
		type: 'select',
		required: true,
		options: ['Company', 'Warehouse', 'Pos', 'User'],
	},
	{
		name: 'level_id',
		type: 'string',
	},
	{
		name: 'type',
		type: 'string',
	},
	{
		name: 'name',
		type: 'string',
	},
];

export const requestList: CafaRequestI[] = [
	{
		request: 'getConfiguration',
		apiFunction: 'getConfiguration',
		fields: [
			{
				name: 'Look-Deeper',
				type: 'select',
				required: false,
				options: ['true', 'false'], // this goes to header
			},
			...mainFields,
		],
	},
	{
		request: 'putConfiguration',
		apiFunction: 'putConfiguration',
		fields: [
			...mainFields,
			{
				name: 'value',
				type: 'string', // JSON OBJECT ??!?!?!?!?
			},
		],
	},
	{
		request: 'postConfiguration',
		apiFunction: 'postConfiguration',
		fields: [
			...mainFields,
			{
				name: 'value',
				type: 'string', // JSON OBJECT ??!?!?!?!?
			},
		],
	},

	{
		request: 'getApplications',
		apiFunction: 'getApplications',
	},
	{
		request: 'deleteConfiguration',
		apiFunction: 'deleteConfiguration',
		fields: [...mainFields],
	},
	{
		request: 'configForApplication',
		apiFunction: 'getConfigForApplication',
		fields: [
			{
				name: 'applicationName',
				type: 'select',
				required: true,
				options: [], // to be filled by api request
			},
		],
	},
];
