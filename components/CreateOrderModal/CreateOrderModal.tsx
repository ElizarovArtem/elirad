'use client';

import React from 'react';
import { Button, Form, FormInstance, Input } from 'antd';
import { useRouter } from 'next/navigation';
import ModalUi from '@/components/Modal/ModalUI';
import { useOrdersStore } from '@/store/ordersStore';
import { CreateOrderPayload } from '@/types/orders';
import UiUpload from '@/components/UiUpload/UiUpload';
import { Routes } from '@/utils/constants';
import style from './CreateOrderModal.module.scss';

function CreateOrderModal() {
	const formRef = React.useRef<FormInstance>(null);
	const { push } = useRouter();

	const { setIsCreateOrderModalOpen, isCreateOrderModalOpen, createOrder } =
		useOrdersStore();

	const onFinish = (values: CreateOrderPayload) => {
		createOrder(values).then(() => push(Routes.radio));
	};

	return (
		<ModalUi
			open={isCreateOrderModalOpen}
			onCancel={() => setIsCreateOrderModalOpen(false)}
			title="Создание заказа"
		>
			<Form
				onFinish={onFinish}
				layout="vertical"
				className={style.form}
				ref={formRef}
			>
				<UiUpload isFormItem />
				<Form.Item
					label="Название изделия"
					name="name"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input placeholder="Название изделия" />
				</Form.Item>
				<Form.Item
					label="Описание изделия"
					name="description"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input.TextArea placeholder="Описание изделия" rows={6} />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit">Создать заказ</Button>
				</Form.Item>
			</Form>
		</ModalUi>
	);
}

export default CreateOrderModal;
