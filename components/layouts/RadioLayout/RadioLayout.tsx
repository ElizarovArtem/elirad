import React from 'react';
import style from './RadioLayout.module.scss';

type TMainLayoutProps = {
	children: React.ReactNode;
};

function RadioLayout({ children }: TMainLayoutProps) {
	return (
		<>
			<div className={style.siteInfo}>
				Напишите нам что бы вы хотели, чтобы мы нашли для Вас в Китае, нажав на
				кнопку "Сделать заказ" или выберите из уже найденных нами товаров для
				других покупателей.
			</div>
			<div className={style.content}>{children}</div>
		</>
	);
}

export default RadioLayout;
