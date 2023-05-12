'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useOrdersStore } from '@/store/ordersStore';
import style from './RadioHeader.module.scss';

function RadioHeader() {
	const { setIsAuthModalOpen, phone } = useAuthStore();
	const { setIsCreateOrderModalOpen } = useOrdersStore();

	const onMakeOrderClick = () => {
		if (phone) {
			setIsCreateOrderModalOpen(true);
		} else {
			setIsAuthModalOpen(true);
		}
	};

	return (
		<div className={style.siteInfo}>
			<p>
				Напишите нам что бы вы хотели, чтобы мы нашли для Вас в Китае, нажав на
				кнопку "Сделать заказ" или выберите из уже найденных нами товаров для
				других покупателей.
			</p>
			<button className={style.makeOrderButton} onClick={onMakeOrderClick}>
				Сделать заказ
			</button>
		</div>
	);
}

export default RadioHeader;
