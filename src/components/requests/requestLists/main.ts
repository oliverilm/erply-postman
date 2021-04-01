export interface RequestJsonI {
	baseUrl?: string;
	request: string;
	path: string;
	method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
	description: string;
	fields: {
		name: string;
		type: 'select' | 'string' | 'number';
		options?: string[];
		helper?: string;
		paramType: 'QUERY' | 'PATH' | 'BODY';
	}[];
}
