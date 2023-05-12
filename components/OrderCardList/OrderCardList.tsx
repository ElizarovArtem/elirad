'use client';

import React, { useCallback, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { TOrder } from '@/types/orders';
import OrderInfoModal from '@/components/OrderInfoModal/OrderInfoModal';

import getConfig from '@/utils/getConfig';
import style from './OrderCard.module.scss';

const { Meta } = Card;

type TOrderCardProps = {
	orders: TOrder[];
};

const OrderCardList: React.FC<TOrderCardProps> = ({ orders = [] }) => {
	const [openedOrder, setOpenedOrder] = useState<TOrder | null>(null);

	const onModalClose = useCallback(() => {
		setOpenedOrder(null);
	}, []);

	return (
		<>
			<Row gutter={[24, 24]}>
				{orders.map((order) => (
					<Col span={8} key={order._id}>
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
