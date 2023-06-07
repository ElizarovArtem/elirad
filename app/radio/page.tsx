import React from 'react';
import OrderCardList from '@/components/OrderCardList/OrderCardList';
import RadioHeader from '@/components/RadioHeader/RadioHeader';
import style from './OrderPage.module.scss';

async function RadioPage() {
	return (
		<>
			<RadioHeader />
			<div className={style.main}>
				<div className={style.list}>
					<OrderCardList />
				</div>
			</div>
		</>
	);
}

export default RadioPage;
