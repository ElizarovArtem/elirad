'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { DefaultOptionType } from 'rc-select/lib/Select';
import dayjs, { Dayjs } from 'dayjs';
import * as querystring from 'querystring';
import { useLkStore } from '@/store/lkStore';
import { TOrder } from '@/types/orders';
import UpdateOrderModal from '@/components/lk/UpdateOrderModal/UpdateOrderModal';
import LkOrederItem from '@/components/lk/LkOrdersList/components/LkOrederItem/LkOrederItem';
import { statusesOptions } from '@/components/lk/constants';
import style from './LkOrdersList.module.scss';

const { RangePicker } = DatePicker;

type TLkOrdersListProps = {
	searchParams?: any;
};

type RangeValue = [Dayjs | null, Dayjs | null] | null;

function LkOrdersList({ searchParams }: TLkOrdersListProps) {
	const { getOrders, orders } = useLkStore();
	const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
	const [dates, setDates] = useState<RangeValue>([
		searchParams.dateFrom ? dayjs(new Date(searchParams.dateFrom)) : null,
		searchParams.dateTo ? dayjs(new Date(searchParams.dateTo)) : null,
	]);
	const [status, setStatus] = useState<DefaultOptionType | null>(
		statusesOptions?.find((_status) => _status.value === searchParams.status) ||
			null,
	);
	const onModalCancel = useCallback(() => setSelectedOrder(null), []);
	const { push } = useRouter();
	const pathname = usePathname();

	const onStatusChange = (value: DefaultOptionType) => {
		setStatus(value);
		push(
			`${pathname}?${querystring.stringify({
				...searchParams,
				status: value,
			})}`,
		);
	};

	const onDateChange = (value: RangeValue) => {
		const dateFrom =
			value && value[0] ? new Date(value[0]?.toDate()).getTime() : null;
		const dateTo =
			value && value[1] ? new Date(value[1]?.toDate()).getTime() : null;

		setDates([value?.[0] || null, value?.[1] || null]);
		push(
			`${pathname}?${querystring.stringify({
				...searchParams,
				dateFrom: dateFrom,
				dateTo: dateTo,
			})}`,
		);
	};

	const reset = () => {
		setDates([null, null]);
		setStatus(null);
		if (typeof pathname === 'string') {
			push(pathname);
		}
	};

	useEffect(() => {
		getOrders(searchParams).then();
	}, [searchParams]);

	return (
		<>
			<div className={style.filterWrapper}>
				<Select
					value={status}
					onChange={onStatusChange}
					options={statusesOptions}
					placeholder="Статус заказа"
				/>
				<RangePicker
					value={dates}
					onChange={onDateChange}
					placeholder={['Начальная дата', 'Конечная дата']}
				/>
				<Button onClick={reset}>Сбросить</Button>
			</div>
			<div className={style.ordersList}>
				{orders.map((order) => (
					<LkOrederItem
						key={order._id}
						order={order}
						onClick={() => setSelectedOrder(order)}
					/>
				))}
			</div>

			<UpdateOrderModal order={selectedOrder} onCancel={onModalCancel} />
		</>
	);
}

export default LkOrdersList;
