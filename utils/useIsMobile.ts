import { useEffect, useState } from 'react';
import useResizeObserver from './useResizeObserver';

const MOBILE_WIDTH = 768;

const useIsMobile = () => {
	const { width } = useResizeObserver();
	const [isMobile, setIsMobile] = useState(width <= MOBILE_WIDTH);

	useEffect(() => {
		setIsMobile(width <= MOBILE_WIDTH);
	}, [width]);

	return isMobile;
};

export default useIsMobile;
