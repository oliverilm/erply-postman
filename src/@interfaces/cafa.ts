import { CafaLevel } from '../@types';

export interface CafaBaseResponse<T> {
	status: any;
	data: T;
}

export interface CafaGetConfigurationI {}

export interface CafaPutConfigurationI {}

export interface CafaPostConfigurationI {
	applications: string[];
}

export interface CafaGetAppsResponseI {
	applications: string[];
}

export interface CafaDeleteConfigurationI {}

export interface CafaGetConfForAppI {}

export interface CafaSaveContentI {
	application: string;
	level: CafaLevel;
	level_id: string;
	name: string;
	type: string;
	value: {};
}
