import '@styles/globals.scss';
import React from 'react';
import classNames from 'classnames';
import { Archivo } from '@next/font/google';
import AuthGuard from '@/components/AuthGuard/AuthGuard';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const archivo = Archivo({ weight: '400', subsets: ['latin'], display: 'swap' });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />
			<body className={archivo.className}>
				<AuthGuard>
					<div className={classNames('headerBackground')}>
						<Header />
					</div>
					<MainLayout>{children}</MainLayout>
					<div className={'footerBackground'}>
						<Footer />
					</div>
				</AuthGuard>
			</body>
		</html>
	);
}
