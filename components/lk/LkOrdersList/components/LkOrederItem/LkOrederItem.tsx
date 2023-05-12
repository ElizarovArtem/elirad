import React from 'react';
import { TOrder } from '@/types/orders';
import ParamItem from '@/components/lk/LkOrdersList/components/ParamItem/ParamItem';
import { UserRoles } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';
import { adminColumns, userColumns } from '@/components/lk/constants';
import style from './LkOrederItem.module.scss';

type TLkOrederItemmProps = {
	order: TOrder;
	onClick: () => void;
};

function LkOrederItem({ order, onClick }: TLkOrederItemmProps) {
	const { role } = useAuthStore();

	const params =
		role === UserRoles.ADMIN ? adminColumns(order) : userColumns(order);

	return (
		<div className={style.wrapper} onClick={onClick}>
			{params.map((param) => (
				<ParamItem key={order._id} title={param.title} value={param.value} />
			))}
		</div>
	);
}

export default LkOrederItem;
