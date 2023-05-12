import React from 'react';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import style from './ModalUI.module.scss';

type TModalUIProps = ModalProps & {
	children: React.ReactNode;
};

function ModalUi({
	children,
	className,
	footer = null,
	...props
}: TModalUIProps) {
	return (
		<Modal
			className={classNames(style.modal, className)}
			footer={footer}
			{...props}
		>
			<div className={style.modalContent}>{children}</div>
		</Modal>
	);
}

export default ModalUi;
