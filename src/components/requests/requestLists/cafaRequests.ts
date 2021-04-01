import { UserI } from '../../../@interfaces';
import { CafaBaseResponse } from '../../../@interfaces/cafa';
import api from '../../../api';

export interface CafaRequestFieldI {
	name: string;
	type: 'select' | 'string' | 'number';
	required?: boolean;
	options?: string[];
}

export interface CafaRequestI {
	request: string;
	apiFunction: (user: UserI, formData: any) => Promise<CafaBaseResponse<any>>;
	fields?: CafaRequestFieldI[];
}

export interface CafaRequestTemplateI {
	application: string;
	level: 'Company' | 'Warehouse' | 'Pos' | 'User';
	level_id: string;
	type: string;
	'Look-Deeper': 'true' | 'false' | '';
	name?: string;
	value?: string;
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
		apiFunction: api.CAFA.getConfiguration,
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
		apiFunction: api.CAFA.putConfiguration,
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
		apiFunction: api.CAFA.postConfiguration,
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
		apiFunction: api.CAFA.getApplications,
	},
	{
		request: 'deleteConfiguration',
		apiFunction: api.CAFA.deleteConfiguration,
		fields: [...mainFields],
	},
	{
		request: 'configForApplication',
		apiFunction: api.CAFA.getConfigForApplication,
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
