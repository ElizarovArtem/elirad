'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Routes, RoutesPermissions, UserRoles } from '@/utils/constants';

type TAuthGuardProps = {
	children: React.ReactNode;
};

function AuthGuard({ children }: TAuthGuardProps) {
	const { checkAuth, role, phone } = useAuthStore();
	const [isSync, setIsSync] = useState(false);
	const pathname = usePathname();
	const { push } = useRouter();

	useEffect(() => {
		if (!phone) {
			checkAuth().then(() => setIsSync(true));
		}
	}, []);

	useEffect(() => {
		if (!RoutesPermissions[pathname as string]?.forRoles.includes(role)) {
			push(Routes.radio);
		} else if (
			isSync &&
			role === UserRoles.UNAUTHORIZED &&
			pathname !== Routes.radio
		) {
			push(Routes.radio);
		}
	}, [role, phone]);

	return <>{children}</>;
}

export default AuthGuard;
