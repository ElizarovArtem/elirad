import React, { useState } from 'react';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { Form, FormItemProps, Upload, UploadFile, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

export const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

type TUploadUiProps = {
	formItemProps?: FormItemProps;
	uploadProps?: UploadProps;
	isFormItem?: boolean;
};

function UiUpload({ isFormItem, uploadProps, formItemProps }: TUploadUiProps) {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const handleChange: UploadProps['onChange'] = (
		info: UploadChangeParam<UploadFile>,
	) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	const dummyRequest = ({ onSuccess }: any) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const upload = (
		<Upload
			name="devicePicture"
			listType="picture-card"
			showUploadList={false}
			onChange={handleChange}
			customRequest={dummyRequest}
			{...uploadProps}
		>
			{imageUrl ? (
				<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
			) : (
				<div>
					{loading ? <LoadingOutlined /> : <PlusOutlined />}
					<div style={{ marginTop: 8 }}>Загрузить фото изделия</div>
				</div>
			)}
		</Upload>
	);

	return isFormItem ? (
		<Form.Item
			label="Загрузить изображение прибора"
			name="image"
			valuePropName="fileList"
			getValueFromEvent={normFile}
			{...formItemProps}
		>
			{upload}
		</Form.Item>
	) : (
		upload
	);
}

export default UiUpload;
