'use client';

import React from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import IconProfileOutline from '@/icons/ProfileIcon';
import { useAuthStore } from '@/store/authStore';
import { MENU_ROUTES } from '@/utils/constants';
import { useIsMobile } from '@/utils/useIsMobile';
import style from './Header.module.scss';

type Props = {
	children?: React.ReactNode;
	className?: string;
};
const HeaderComponent: React.FC<Props> = ({ className }) => {
	const { phone: isProfile, role, logout, setIsAuthModalOpen } = useAuthStore();
	const isMobile = useIsMobile();

	const menuContent = (
		<div className={style.menuContent}>
			{MENU_ROUTES[role].map((item) => (
				<Link key={item.route} href={item.route}>
					{item.name}
				</Link>
			))}
		</div>
	);

	return (
		<div className={classNames(style.headerWrapper, className)}>
			<div className={style.header}>
				<div className={classNames(style.logo)}>ЄLIRAD</div>
				{isProfile ? (
					<div className={style.menuWrapper}>
						<Popover
							placement="bottomRight"
							title="Меню"
							content={menuContent}
							arrow
						>
							<div className={style.headerButton}>
								{isMobile ? <UserOutlined /> : isProfile}
							</div>
						</Popover>
						<div className={style.headerButton} onClick={logout}>
							Выйти <LogoutOutlined />
						</div>
					</div>
				) : (
					<div
						className={style.menuWrapper}
						onClick={() => setIsAuthModalOpen(true)}
					>
						<span>Войти</span>
						<IconProfileOutline className={style.profileIcon} />
					</div>
				)}
			</div>
		</div>
	);
};

export default HeaderComponent;
