import {
	BaseRequestResponse,
	CredentialsI,
	CustomerAPIResponse,
	UserI,
} from '../@interfaces';
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
	CUSTOMER: {
		generic: (body: GenericRequestI) => Promise<CustomerAPIResponse<unknown>>;
	};
	ERPLY: {
		generic: (body: GenericRequestI) => Promise<BaseRequestResponse<unknown>>;
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
};
export default api;
