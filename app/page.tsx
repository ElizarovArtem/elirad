import { Inter } from '@next/font/google';
import { redirect } from 'next/navigation';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	redirect('/radio');

	return (
		<div className={inter.className}>
			<div className="siteInfo">
				<h1>Elirad</h1>
			</div>
		</div>
	);
}
