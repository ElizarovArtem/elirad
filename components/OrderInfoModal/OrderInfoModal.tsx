import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import ModalUi from '@/components/Modal/ModalUI';
import { TOrder } from '@/types/orders';
import { useAuthStore } from '@/store/authStore';
import { useOrdersStore } from '@/store/ordersStore';
import { Routes } from '@/utils/constants';
import getConfig from '@/utils/getConfig';
import style from './OrderInfoModal.module.scss';

type TOrderInfoModal = {
	order: TOrder | null;
	onModalClose: () => void;
};

function OrderInfoModal({ order, onModalClose }: TOrderInfoModal) {
	const { _id, setIsAuthModalOpen } = useAuthStore();
	const { createOrderFromMainPage } = useOrdersStore();
	const { push } = useRouter();

	const makeOrder = async () => {
		if (_id && order) {
			await createOrderFromMainPage({
				name: order.name,
				description: order.description,
				image: order.image,
			});
			onModalClose();
			push(Routes.radio);
		}
	};

	const signIn = () => setIsAuthModalOpen(true);

	if (!order) {
		return null;
	}

	return (
		<ModalUi title={order.name} open={!!order} onCancel={onModalClose}>
			<img
				src={`${getConfig().apiImageUrl}/${order.image}`}
				alt={order.name}
				className={style.image}
			/>
			<div>{order.description}</div>
			<div className={style.makeOrderSection}>
				{order.price && <span className={style.price}>{order.price} руб.</span>}
				{!_id ? (
					<Button onClick={signIn}>Войти в систему</Button>
				) : (
					<Button onClick={makeOrder}>Заказать</Button>
				)}
			</div>
		</ModalUi>
	);
}

export default OrderInfoModal;
