'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { TOrder } from '@/types/orders';
import OrderInfoModal from '@/components/OrderInfoModal/OrderInfoModal';

import getConfig from '@/utils/getConfig';
import { useOrdersStore } from '@/store/ordersStore';
import useIsMobile from '@/utils/useIsMobile';
import style from './OrderCard.module.scss';

const { Meta } = Card;

type TOrderCardProps = {};

const OrderCardList: React.FC<TOrderCardProps> = () => {
	const [openedOrder, setOpenedOrder] = useState<TOrder | null>(null);
	const { orders, getOrders, isLoading } = useOrdersStore();
	const isMobile = useIsMobile();

	const onModalClose = useCallback(() => {
		setOpenedOrder(null);
	}, []);

	useEffect(() => {
		getOrders();
	}, []);

	if (isLoading) {
		return (
			<div className={style.loading}>
				<Spin />
			</div>
		);
	}

	return (
		<>
			<Row gutter={[24, 24]}>
				{orders.map((order) => (
					<Col span={isMobile ? 24 : 8} key={order._id}>
						<Card
							className={style.card}
							hoverable
							onClick={() => setOpenedOrder(order)}
							cover={
								<img
									alt="example"
									src={`${getConfig().apiImageUrl}/${order.image}`}
								/>
							}
						>
							<Meta
								title={order.name}
								description={order._id + ' ' + (order.description || '')}
							/>
						</Card>
					</Col>
				))}
			</Row>

			<OrderInfoModal order={openedOrder} onModalClose={onModalClose} />
		</>
	);
};

export default OrderCardList;
