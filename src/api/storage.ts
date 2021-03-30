import { ResponseI, UserI } from '../@interfaces';

class PluginStorage {
	getUsers(): UserI[] {
		const jsonString = localStorage.getItem('userList');
		return jsonString ? JSON.parse(jsonString) : [];
	}

	setUsers(userArr: UserI[]): void {
		localStorage.setItem('userList', JSON.stringify(userArr));
	}

	setResponses(responses: ResponseI[]): void {
		localStorage.setItem('responseList', JSON.stringify(responses));
	}

	getResponses(): ResponseI[] {
		const jsonString = localStorage.getItem('responseList');
		return jsonString ? JSON.parse(jsonString) : [];
	}
}

export default new PluginStorage();
