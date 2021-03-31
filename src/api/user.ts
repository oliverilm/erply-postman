import { UserI } from '../@interfaces';
import api from './index';

export const defaultUser: UserI = {
	selected: true,
	id: 0,
	clientCode: null,
	sessionKey: null,
	username: null,
	password: null,
	lastLogin: 0,
	credentials: null,
	endpoints: null,
};

export interface PostmanValuesI {
	customerRegistryUrl: string;
	customerRegistryToken: string;
	cafaUrl: string;
	identityToken: string;
	token: string;
}

export default class UserManager {
	user: UserI;

	constructor(user: UserI) {
		this.user = user;
	}

	isAuthenticated(): boolean {
		return (
			(this.user?.credentials?.sessionLength ?? 0) +
				this.user?.lastLogin -
				+new Date() / 1000 >
			0
		);
	}

	async login(): Promise<UserI> {
		const result = await api.verifyUser(this.user);
		const serviceEndpoints = await api.getServiceEndpoints(this.user);

		if (result.data.status.responseStatus === 'ok') {
			this.user.credentials = result.data.records[0];
			this.user.lastLogin = +new Date() / 1000;
			this.user.endpoints = serviceEndpoints.data.records[0];
		}
		return this.user;
	}

	authEndTime(): Date | null {
		if (!this.isAuthenticated()) return null;
		if (this.user.credentials?.sessionLength) {
			const endTimeInSeconds =
				this.user.lastLogin + this.user.credentials?.sessionLength;
			const endDate = new Date(endTimeInSeconds * 1000);
			return endDate;
		}
		return null;
	}

	generatePostmanValues(): PostmanValuesI {
		const { credentials, endpoints } = this.user;
		return {
			cafaUrl: endpoints?.cafa.url || '',
			customerRegistryToken:
				credentials && credentials.customerRegistryURLs.length > 0
					? credentials?.customerRegistryURLs[0].token
					: '',
			customerRegistryUrl:
				credentials && credentials.customerRegistryURLs.length > 0
					? credentials?.customerRegistryURLs[0].url
					: '',
			identityToken: credentials?.identityToken || '',
			token: credentials?.token || '',
		};
	}

	// timeTilAuthEnd(): number // returns number of seconds
}
