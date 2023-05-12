import React, { memo, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import ModalUI from '@/components/Modal/ModalUI';
import { IUpdateOrder, TOrder } from '@/types/orders';
import UploadUi from '@/components/UiUpload/UploadUi';
import { statusesOptions } from '@/components/lk/constants';
import { useOrdersStore } from '@/store/ordersStore';

type TUpdateOrderModalProps = {
	onCancel: () => void;
	order: TOrder | null;
};

const UpdateOrderModal = memo(function UpdateOrderModal({
	order,
	onCancel,
}: TUpdateOrderModalProps) {
	const { updateOrder, isLoading } = useOrdersStore();
	const [form] = Form.useForm();

	const onFinish = (values: IUpdateOrder) => {
		const updateData: Record<string, any> = {
			_id: order?._id,
		};

		for (const key in values) {
			if (key === 'image') {
				if (values[key]?.[0]?.originFileObj) {
					updateData[key] = values[key];
				}
				continue;
			}

			if (
				order &&
				values[key as keyof IUpdateOrder] !== order[key as keyof typeof order]
			) {
				updateData[key] = values[key as keyof IUpdateOrder];
			}
		}

		updateOrder(updateData).then(onCancel);
	};

	useEffect(() => {
		if (order) {
			const { createdBy, _id, image, ...rest } = order;

			form.setFieldsValue({ ...rest });
		}
	}, [order]);

	return (
		<ModalUI open={!!order} title="Обновление заказа" onCancel={onCancel}>
			<Form layout="vertical" onFinish={onFinish} form={form}>
				<UploadUi isFormItem />
				<Form.Item label="Название изделия" name="name">
					<Input placeholder="Название изделия" />
				</Form.Item>
				<Form.Item label="Описание изделия" name="description">
					<Input.TextArea placeholder="Описание изделия" rows={6} />
				</Form.Item>
				<Form.Item label="Стоимость товара" name="price">
					<Input placeholder="Стоимость товара" />
				</Form.Item>
				<Form.Item label="Статус" name="status">
					<Select options={statusesOptions} />
				</Form.Item>
				<Form.Item
					label="Закрепление на главной"
					name="isMainPageFixed"
					valuePropName="checked"
				>
					<Checkbox />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" loading={isLoading}>
						Обновить заказ
					</Button>
				</Form.Item>
			</Form>
		</ModalUI>
	);
});

export default UpdateOrderModal;
