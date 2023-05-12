import Link from 'next/link';
import style from './Menu.module.scss';

export const Menu = () => {
	return (
		<div className={style.menu}>
			<Link href={'/radiocircuits'}>Radio</Link>
		</div>
	);
};
