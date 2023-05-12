'use client';

import React, { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import style from '@/components/Header/Header.module.scss';
import ModalUi from '@/components/Modal/ModalUI';
import MaskInput from '@/components/MaskInput/MaskInput';
import { useAuthStore } from '@/store/authStore';
import { PHONE_LENGTH } from '@/utils/constants';

function AuthModal() {
	const [phone, setPhone] = useState<string>('');
	const [code, setCode] = useState<string>('');
	const {
		requestCode,
		login,
		isCodeSent,
		error,
		setError,
		isAuthModalOpen,
		setIsAuthModalOpen,
		isLoading,
	} = useAuthStore();

	const onChange = (action: () => void) => {
		if (error) {
			setError('');
		}
		action();
	};

	const onLogin = () => {
		login(code, phone).then(() => {
			setPhone('');
			setCode('');
		});
	};

	const isPhoneInvalid = phone.replace(/\D/g, '').length < PHONE_LENGTH;

	return (
		<ModalUi
			open={isAuthModalOpen}
			onCancel={() => setIsAuthModalOpen(false)}
			title="Регистрация/Авторизация"
		>
			{isCodeSent ? (
				<>
					<MaskInput
						mask="9999"
						value={code}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							onChange(() => setCode(e.currentTarget.value))
						}
					>
						<Input className={style.input} placeholder="Введите смс-код" />
					</MaskInput>
					{error && <span className={style.error}>{error}</span>}
					<Button
						onClick={onLogin}
						className={style.button}
						loading={isLoading}
					>
						Отправить код
					</Button>
				</>
			) : (
				<>
					<MaskInput
						mask="+7 999 999 99 99"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							onChange(() => setPhone(e.currentTarget.value))
						}
						value={phone}
					>
						<Input
							className={style.input}
							placeholder="Введите номер телефона"
						/>
					</MaskInput>
					<Button
						onClick={() => requestCode(phone)}
						className={style.button}
						disabled={isPhoneInvalid}
						loading={isLoading}
					>
						Получить код
					</Button>
				</>
			)}
		</ModalUi>
	);
}

export default AuthModal;
