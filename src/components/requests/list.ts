export interface RequestContent {
	name: string;
	required: boolean;
	type: string;
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
];
