import { SelectProps } from 'antd';
import { format } from 'date-fns';
import { Statuses, TOrder } from '@/types/orders';
import { translateStatuses } from '@/utils/constants';

export const userColumns = (order: TOrder) => {
	return [
		{ title: 'Название', value: order.name },
		{ title: 'Стоимость', value: order.price },
		{ title: 'Статус', value: translateStatuses[order.status] },
		{
			title: 'Дата создания',
			value: format(new Date(order.createdAt), 'yyyy-MM-dd: HH:mm:ss'),
		},
	];
};
export const adminColumns = (order: TOrder) => {
	return [
		{ title: 'Название', value: order.name },
		{ title: 'Стоимость', value: order.price },
		{ title: 'Статус', value: translateStatuses[order.status] },
		{
			title: 'Закреплен на главной',
			value: order.isMainPageFixed ? 'Да' : 'Нет',
		},
		{
			title: 'Дата создания',
			value: format(new Date(order.createdAt), 'yyyy-MM-dd: HH:mm:ss'),
		},
	];
};

export const statusesOptions: SelectProps['options'] = [
	{ value: Statuses.new, label: translateStatuses.new },
	{ value: Statuses.done, label: translateStatuses.done },
	{ value: Statuses.inProgress, label: translateStatuses.inProgress },
];
