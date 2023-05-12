'use client';

import React, { useEffect } from 'react';
import { message } from 'antd';
import { useMessageStore } from '@/store/messageStore';

function MessageConatainer() {
	const [messageApi, contextHolder] = message.useMessage();
	const { type, setType, message: notificationMessage } = useMessageStore();

	useEffect(() => {
		if (type) {
			switch (type) {
				case 'success':
					messageApi
						.success({
							type: 'success',
							content: notificationMessage,
						})
						.then(() => setType(null, ''));
					break;
				case 'error':
					messageApi
						.success({
							type: 'error',
							content: notificationMessage,
						})
						.then(() => setType(null, ''));
					break;
			}
		}
	}, [type]);

	return <div>{contextHolder}</div>;
}

export default MessageConatainer;
