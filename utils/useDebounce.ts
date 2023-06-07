import { useCallback, useRef } from 'react';

const useDebounce = (delay = 300) => {
	const timer = useRef<NodeJS.Timeout>();

	return useCallback(() => {
		if (timer.current) clearTimeout(timer.current);
		return new Promise((resolve) => {
			timer.current = setTimeout(resolve, delay);
		});
	}, [delay]);
};

export default useDebounce;
