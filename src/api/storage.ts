import { ResponseI, UserI } from '../@interfaces';

class PluginStorage {
	get(val: string) {
		const jsonString = localStorage.getItem(val);
		return jsonString ? JSON.parse(jsonString) : [];
	}
	set(name: string, val: unknown): void {
		const json = JSON.stringify(val);
		localStorage.setItem(name, json);
	}

	getUsers(): UserI[] {
		return this.get('userList');
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

	getFavs(): string[] {
		return this.get('FavRequests');
	}

	setFavs(favs: string[]): void {
		this.set('FavRequests', favs);
	}

	addFav(fav: string): void {
		const favs = this.getFavs();
		this.setFavs([...favs, fav]);
	}

	toggleFav(fav: string): boolean {
		const favs = this.getFavs();
		if (favs.includes(fav)) {
			this.setFavs(favs.filter((f) => f !== fav));
			return false;
		} else {
			this.setFavs([...favs, fav]);
			return true;
		}
	}
	isFav(name: string): boolean {
		return this.getFavs().includes(name);
	}

	companySelection(): string[] {
		const usersList = this.getUsers();
		const cList = usersList
			.map((user) => (user.company ? user.company : ''))
			.filter((c) => c !== '');
		return cList;
	}
}

export default new PluginStorage();
