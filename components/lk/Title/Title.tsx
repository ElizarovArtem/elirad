'use client';

import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Routes } from '@/utils/constants';
import style from './Title.module.scss';

function Title() {
	const { name } = useAuthStore();
	const { push } = useRouter();

	const goBack = () => {
		push(Routes.radio);
	};

	return (
		<div className={style.wrapper}>
			<Button onClick={goBack}>На главную</Button>
			<div className={style.title}>
				Личный кабинет. {name ? name + ', ' : ''}
			</div>
		</div>
	);
}

export default Title;
