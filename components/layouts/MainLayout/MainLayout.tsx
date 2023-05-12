import React from 'react';
import classNames from 'classnames';
import AuthModal from '@/components/AuthModal/AuthModal';
import CreateOrderModal from '@/components/CreateOrderModal/CreateOrderModal';
import MessageConatainer from '@/components/MessageConatainer/MessageConatainer';
import '@styles/globals.scss';

type TMainLayoutProps = {
	children: React.ReactNode;
};

function MainLayout({ children }: TMainLayoutProps) {
	return (
		<div className={classNames('mainLayout')}>
			{children}

			<MessageConatainer />
			<AuthModal />
			<CreateOrderModal />
		</div>
	);
}

export default MainLayout;
