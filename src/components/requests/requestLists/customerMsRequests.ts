import { RequestI } from './erplyRequests';

export const CustomerMsRequests: RequestI[] = [
	{
		request: 'V1/Customer/getMasterRecord',
		title: 'get customers master record',
		fields: [{ name: 'id', required: true, type: 'number' }],
	},

	{
		request: 'V1/Customer/search',
		title: 'get customers master record',
		fields: [{ name: 'searchTerm', required: false, type: 'string' }],
	},

	{
		request: 'V1/Address/list',
		title: 'get customers master record',
		fields: [{ name: 'id', required: true, type: 'number' }],
	},

	{
		request: 'V1/Address/find',
		title: 'get customers master record',
		fields: [{ name: 'id', required: true, type: 'number' }],
	},

	{
		request: 'V1/Address/delete',
		title: 'delete customers master record',
		fields: [{ name: 'id', required: true, type: 'number' }],
	},
];
