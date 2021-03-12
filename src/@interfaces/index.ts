export interface UserI {
	clientCode: string | null;
	sessionKey: string | null;
	username: string | null;
	password: string | null;
	selected: boolean;
	credentials: object | null;
}
