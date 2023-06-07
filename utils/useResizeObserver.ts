'use client';

import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

type TUseResizeObserverProps = {
	delay?: number;
};

const useResizeObserver = ({ delay = 300 }: TUseResizeObserverProps = {}) => {
	const debounce = useDebounce(delay);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		setSize({
			width: window.screen.width,
			height: window.screen.height,
		});
	}, []);

	useEffect(() => {
		const onSizeChange = async () => {
			await debounce();
			setSize({
				width: window.screen.width,
				height: window.screen.height,
			});
		};

		window.addEventListener('resize', onSizeChange);
		return () => window.removeEventListener('resize', onSizeChange);
	}, [delay]);

	return size;
};

export default useResizeObserver;
