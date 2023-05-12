import { useEffect, useState } from 'react';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize(event: any) {
			const newScreen = event.target.innerWidth < 768;
			if (isMobile !== newScreen) {
				setIsMobile(newScreen);
			}
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	return isMobile;
};
