import React from 'react';
import classNames from 'classnames';
import IconWhatsApp from '@/icons/IconWhatsApp';
import IconTelegram from '@/icons/IconTelegram';
import style from './Footer.module.scss';

function Footer() {
	return (
		<div className={style.footer}>
			<div className={style.footerItem}>
				<div className={style.itemTitle}>Контактные номера телефонов</div>
				<div className={style.itemContent}>
					<a href={`tel:+79219951060`}>+7 (921) 995-10-60</a>
					<a href={`tel:+79817002076`}>+7 (981) 700-20-76</a>
				</div>
			</div>
			<div className={style.footerItem}>
				<div className={style.itemTitle}>Социальные сети</div>
				<div className={classNames(style.itemContent, style.socials)}>
					<a
						href={'https://wa.me/79219951060'}
						target="_blank"
						rel="noreferrer"
					>
						<IconWhatsApp width={39} height={39} />
					</a>
					<a
						href={'https://wa.me/79817002076'}
						target="_blank"
						rel="noreferrer"
					>
						<IconWhatsApp width={39} height={39} />
					</a>
					<a
						href={'https://t.me/Elizarov_Artem'}
						target="_blank"
						rel="noreferrer"
					>
						<IconTelegram width={39} height={39} />
					</a>
				</div>
			</div>
			<div className={classNames(style.footerItem, style.logoSection)}>
				<div className={style.itemTitle}>
					{new Date().getFullYear()}. ЄLIRAD
				</div>
			</div>
		</div>
	);
}

export default Footer;
