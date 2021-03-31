export interface RequestContent {
	name: string;
	required: boolean;
	type: 'string' | 'number' | 'select';
	options?: string[];
	helper?: string;
}

export interface RequestI {
	request: string;
	title?: string;
	description?: string;
	tags?: string[];
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

	{
		request: 'getWarehouses',
		title: 'get a specific or a list of warehouses',
		fields: [
			{ name: 'warehouseID', required: false, type: 'number' },
			{ name: 'code', required: false, type: 'string' },
			{ name: 'storeRegionID', required: false, type: 'number' },
			{ name: 'assortmentID', required: false, type: 'number' },
			{ name: 'searchAttributeName', required: false, type: 'string' },
			{ name: 'searchAttributeValue', required: false, type: 'string' },
		],
	},

	{
		request: 'getProducts',
		title: 'get a specific or a list of products',
		fields: [
			{ name: 'productID', required: false, type: 'number' },
			{ name: 'productIDs', required: false, type: 'string' },
			{
				name: 'type',
				required: false,
				type: 'select',
				options: ['PRODUCT', 'BUNDLE', 'MATRIX', 'ASSEMBLY'],
			},
			{ name: 'groupID', required: false, type: 'number' },
			{ name: 'categoryID', required: false, type: 'number' },
			{ name: 'code', required: false, type: 'string' },
		],
	},

	{
		request: 'getCountries',
		title: 'get a specific or a list of countries',
		fields: [
			{ name: 'recordsOnPage', required: false, type: 'number' },
			{ name: 'pageNo', required: false, type: 'number' },
		],
	},
	{
		request: 'getSuppliers',
		title: 'get a specific or a list of suppliers',
		fields: [
			{ name: 'supplierID', required: false, type: 'number' },
			{ name: 'searchName', required: false, type: 'string' },
			{ name: 'searchPersonFullName', required: false, type: 'string' },
			{ name: 'searchPersonFirstName', required: false, type: 'string' },
			{ name: 'searchPersonLastName', required: false, type: 'string' },
			{ name: 'searchVATNo', required: false, type: 'string' },
			{ name: 'searchRegistryCode', required: false, type: 'string' },
			{ name: 'searchAttributeName', required: false, type: 'string' },
			{ name: 'searchAttributeValue', required: false, type: 'string' },
			{ name: 'supplierManagerID', required: false, type: 'number' },
			{ name: 'groupID', required: false, type: 'number' },
			{
				name: 'mode',
				required: false,
				type: 'select',
				options: ['SUPPLIERS', 'CONTACTS', 'ALL'],
			},
			{
				name: 'orderBy',
				required: false,
				type: 'select',
				options: ['supplierID', 'name', 'group', 'lastChanged'],
			},
			{
				name: 'orderByDir',
				required: false,
				type: 'select',
				options: ['asc', 'desc'],
			},
			{ name: 'recordsOnPage', required: false, type: 'number' },
			{ name: 'pageNo', required: false, type: 'number' },
		],
	},
];

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
