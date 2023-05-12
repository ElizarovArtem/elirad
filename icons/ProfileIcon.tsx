'use client';

import React from 'react';
import { UserOutlined } from '@ant-design/icons';

type Props = {
	onClick?: () => void;
	className: string;
};

function IconProfileOutline(props: Props) {
	return <UserOutlined {...props} />;
}

export default IconProfileOutline;
