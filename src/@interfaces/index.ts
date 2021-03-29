/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseRequestResponse<T> {
	data: {
		status: {
			request: string;
			requestUnixTime: number;
			responseStatus: 'error' | 'ok';
			errorCode: number;
			generationTime: number;
			recordsTotal: number;
			recordsInResponse: number;
		};
		records: T[];
	};
	status: number;
	statusText: number;
	headers: any;
	config: any;
	request: any;
}
export interface CustomerRegistryURLI {
	url: string;
	token: string;
	priority: number;
	weight: number;
}

export interface EpsiDownloadURLI {
	operatingSystem: string;
	url: string;
}

export interface CredentialsI {
	userID: string;
	userName: string;
	employeeID: string;
	employeeName: string;
	groupID: string;
	groupName: string;
	ipAddress: string;
	sessionKey: string;
	sessionLength: number;
	isPasswordExpired: boolean;
	loginUrl: string;
	berlinPOSVersion: string;
	berlinPOSAssetsURL: string;
	epsiURL: string;
	remindUserToUpdateUsername: number;
	customerRegistryURLs: CustomerRegistryURLI[];
	couponRegistryURLs: [];
	displayAdManagerURLs: [];
	epsiDownloadURLs: EpsiDownloadURLI[];
	identityToken: string;
	token: string;
}

export interface UserI {
	id: number;
	clientCode: string | null;
	sessionKey: string | null;
	username: string | null;
	password: string | null;
	selected: boolean;
	lastLogin: number;
	credentials: CredentialsI | null;
}

export interface ResponseI {
	user: UserI;
	request: string;
	time: number;
	response: any;
	error: boolean;
}

export interface CustomerAPIResponse<T> {
	data: {
		result: null | T;
		api: {
			time: null | any;
			uniqueId: null | any;
			cache: {
				cached: boolean;
				ttl: null | any;
				expires: null | number;
			};
			path: null | any;
			generationTime: string;
		};
		error: {
			message: string;
			code: number;
		};
	};
	status: number;
	statusText: string;
}
