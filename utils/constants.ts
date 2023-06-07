import { TOrderStatus } from '@/types/orders';

export enum UserRoles {
	UNAUTHORIZED = 'UNAUTHORIZED',
	USER = 'USER',
	ADMIN = 'ADMIN',
}

type valueof<T> = T[keyof T];

export const Routes = {
	main: '/',
	radio: '/radio',
	radioOrders: '/lk/orders-list',
};

export const RoutesPermissions: Record<
	valueof<typeof Routes>,
	{ forRoles: UserRoles[] }
> = {
	'/': { forRoles: [UserRoles.USER, UserRoles.ADMIN, UserRoles.UNAUTHORIZED] },
	'/radio': { forRoles: [UserRoles.USER, UserRoles.ADMIN] },
	'/lk/orders-list': {
		forRoles: [UserRoles.USER, UserRoles.ADMIN],
	},
};

export const MENU_ROUTES: Record<UserRoles, { route: string; name: string }[]> =
	{
		USER: [{ route: Routes.radioOrders, name: 'Заказы' }],
		ADMIN: [{ route: Routes.radioOrders, name: 'Заказы' }],
		UNAUTHORIZED: [],
	};

export const PHONE_LENGTH = 11;

export const translateStatuses: Record<TOrderStatus, string> = {
	done: 'Выполнен',
	new: 'Новый',
	inProgress: 'В процессе',
};
