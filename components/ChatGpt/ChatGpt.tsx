'use client';

import React, { useState } from 'react';
import { Button, Input, Spin } from 'antd';
import { useLkStore } from '@/store/lkStore';
import { useAuthStore } from '@/store/authStore';
import { UserRoles } from '@/utils/constants';
import style from './ChatGpt.module.scss';

function ChatGpt() {
	const [value, setValue] = useState('');
	const { chat, answer, chatLoading } = useLkStore();
	const { role } = useAuthStore();

	if (role !== UserRoles.ADMIN) {
		return null;
	}

	return (
		<div className={style.chatRpt}>
			<div className={style.title}>Спроси у ChatGpt</div>
			<Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
			<Button className={style.button} onClick={() => chat(value)}>
				Спросить
			</Button>
			<br />
			<br />
			{chatLoading ? (
				<Spin className={style.spinner} />
			) : (
				answer.map((answer) => (
					<p key={answer.index}>{answer.message.content}</p>
				))
			)}
		</div>
	);
}

export default ChatGpt;
