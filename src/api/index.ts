/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	BaseRequestResponse,
	CredentialsI,
	CustomerAPIResponse,
	ServiceEndpointsI,
	UserI,
} from '../@interfaces';
import { CafaBaseResponse, CafaGetAppsResponseI } from '../@interfaces/cafa';
import { CafaRequestTemplateI } from '../components/requests/cafa/requestList';
import cafa, { addHeaders, getUrl } from './instances/cafa.instance';
import customer from './instances/customer.instance';
import erply from './instances/erply.instance';

interface BaseGeneric {
	user: UserI;
	request: string;
}
interface GenericRequestI extends BaseGeneric {
	[key: string]: string | number | unknown;
}

interface APIProps {
	verifyUser: (user: UserI) => Promise<BaseRequestResponse<CredentialsI>>;
	getServiceEndpoints: (
		user: UserI
	) => Promise<BaseRequestResponse<ServiceEndpointsI>>;
	CUSTOMER: {
		generic: (body: GenericRequestI) => Promise<CustomerAPIResponse<unknown>>;
	};
	ERPLY: {
		generic: (body: GenericRequestI) => Promise<BaseRequestResponse<unknown>>;
	};
	CAFA: {
		getConfiguration: (
			user: UserI,
			formData: any
		) => Promise<CafaBaseResponse<any>>;
		getConfigForApplication: (
			user: UserI,
			content: any
		) => Promise<CafaBaseResponse<any>>;
		deleteConfiguration: (
			user: UserI,
			content: any
		) => Promise<CafaBaseResponse<any>>;
		getApplications: (
			user: UserI,
			content: any
		) => Promise<CafaBaseResponse<any>>;
		postConfiguration: (
			user: UserI,
			content: any
		) => Promise<CafaBaseResponse<any>>;
		putConfiguration: (
			user: UserI,
			content: any
		) => Promise<CafaBaseResponse<any>>;
	};
}

const api: APIProps = {
	verifyUser: ({
		clientCode,
		username,
		password,
	}: UserI): Promise<BaseRequestResponse<CredentialsI>> => {
		const body = {
			request: 'verifyUser',
			clientCode,
			username,
			password,
		};
		return erply.post(`https://${clientCode}.erply.com/api/`, body);
	},

	getServiceEndpoints: ({
		clientCode,
		username,
		password,
	}: UserI): Promise<BaseRequestResponse<ServiceEndpointsI>> => {
		const body = {
			request: 'getServiceEndpoints',
			clientCode,
			username,
			password,
		};
		return erply.post(`https://${clientCode}.erply.com/api/`, body);
	},

	ERPLY: {
		generic: (body: GenericRequestI): Promise<BaseRequestResponse<unknown>> => {
			const { user, ...rest } = body;
			const completeBody = {
				sessionKey: user.credentials?.sessionKey,
				clientCode: user.clientCode,
				recordsOnPage: 100,
				pageNo: 1, // TODO: get all records, or make an option for it.
				...rest,
			};
			return erply.post(
				`https://${user.clientCode}.erply.com/api/`,
				completeBody
			);
		},
	},
	CUSTOMER: {
		generic: (body: GenericRequestI): Promise<CustomerAPIResponse<unknown>> => {
			const { user, ...rest } = body;
			const { url, token: jwt } = user.credentials
				? user.credentials?.customerRegistryURLs[0]
				: { url: '', token: '' };

			const completeBody = {
				sessionKey: user.credentials?.sessionKey,
				clientCode: user.clientCode,
				jwt,
				...rest,
			};
			return customer.post(`${url}v1/${body.request}`, completeBody);
		},
	},

	CAFA: {
		getApplications: (
			user: UserI,
			content: any
		): Promise<CafaBaseResponse<CafaGetAppsResponseI>> => {
			addHeaders(user);
			return cafa.get('configuration/apps');
		},
		getConfiguration: (
			user: UserI,
			content: CafaRequestTemplateI
		): Promise<CafaBaseResponse<any>> => {
			return cafa.get(getUrl('configuration', content), {
				headers: {
					'Look-Deeper':
						content['Look-Deeper'] !== '' && content['Look-Deeper'] === 'true',
				},
			});
		},
		getConfigForApplication: (
			user: UserI,
			content: any
		): Promise<CafaBaseResponse<any>> => {
			return cafa.post('', content);
		},
		deleteConfiguration: (
			user: UserI,
			content: any
		): Promise<CafaBaseResponse<any>> => {
			return cafa.post('', content);
		},
		postConfiguration: (
			user: UserI,
			content: any
		): Promise<CafaBaseResponse<any>> => {
			return cafa.post('', content);
		},
		putConfiguration: (
			user: UserI,
			content: any
		): Promise<CafaBaseResponse<any>> => {
			return cafa.post('', content);
		},
	},
};
export default api;
