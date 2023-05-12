import React from 'react';
import style from './ParamItem.module.scss';

type TParamItemProps = {
	title: string;
	value?: string;
};

function ParamItem({ title, value }: TParamItemProps) {
	return (
		<div className={style.wrapper}>
			<div className={style.title}>{title}</div>
			<div className={style.value}>{value}</div>
		</div>
	);
}

export default ParamItem;
