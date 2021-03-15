import { UserI } from '../@interfaces';
import api from './index';
import PluginStorage from './storage';

export const defaultUser: UserI = {
	selected: true,
	id: 0,
	clientCode: null,
	sessionKey: null,
	username: null,
	password: null,
	lastLogin: 0,
	credentials: null,
};

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
		if (result.data.status.responseStatus === 'ok') {
			this.user.credentials = result.data.records[0];
			this.user.lastLogin = +new Date() / 1000;
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

	// timeTilAuthEnd(): number // returns number of seconds
}
