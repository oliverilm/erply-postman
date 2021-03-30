import { UserI } from '../../../@interfaces';

export const hasCafaAccess = (user: UserI): boolean => {
	if (user.endpoints) {
		if (user.endpoints.cafa) {
			return true;
		}
	}
	return false;
};

export const hasCustomerAPIAccess = (user: UserI): boolean => {
	if (user.credentials) {
		if (user.credentials.couponRegistryURLs.length > 0) {
			return true;
		}
	}
	return false;
};
