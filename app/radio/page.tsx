import React from 'react';
import OrderCardList from '@/components/OrderCardList/OrderCardList';
import { TOrder } from '@/types/orders';
import RadioHeader from '@/components/RadioHeader/RadioHeader';
import getConfig from '@/utils/getConfig';
import style from './OrderPage.module.scss';

const getOrders = async (): Promise<TOrder[]> => {
	const API_KEY = `${getConfig().apiUrl}/orders/list`;
	const orders = await fetch(API_KEY);
	const response = await orders.json();
	return response.data;
};

async function RadioPage() {
	const orders = await getOrders();

	return (
		<>
			<RadioHeader />
			<div className={style.main}>
				<div className={style.list}>
					<OrderCardList orders={orders} />
				</div>
			</div>
		</>
	);
}

export default RadioPage;
