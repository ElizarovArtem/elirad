import { UploadFile } from 'antd/es/upload/interface';

export type TOrder = {
	_id: string;
	name: string;
	description: string;
	image?: string;
	isMainPageFixed: boolean;
	price?: string;
	createdBy: string;
	createdAt: string;
	status: TOrderStatus;
};

export type TOrderStatus = 'new' | 'inProgress' | 'done';
export enum Statuses {
	'new' = 'new',
	'inProgress' = 'inProgress',
	'done' = 'done',
}

export type CreateOrderPayload = {
	image?: UploadFile[];
	name: string;
	description: string;
};

export type CreateOrderFromMainPagePayload = Pick<
	CreateOrderPayload,
	'name' | 'description'
> & {
	image?: string;
};

export interface IUpdateOrder {
	_id: string;
	name?: string;
	description?: string;
	image?: UploadFile[];
	isMainPageFixed?: boolean;
	price?: string;
	status?: TOrderStatus;
}

export type TGetOrdersFilter = {
	status: Statuses;
	dateFrom: string;
	dateTo: string;
};
