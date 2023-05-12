import React from 'react';
import Title from '@/components/lk/Title/Title';
import LkOrdersList from '@/components/lk/LkOrdersList/LkOrdersList';
import ChatGpt from '@/components/ChatGpt/ChatGpt';

async function OrdersList({ searchParams }: any) {
	return (
		<>
			<Title />
			<LkOrdersList searchParams={searchParams} />
			<ChatGpt />
		</>
	);
}

export default OrdersList;
