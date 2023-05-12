import React from 'react';
import ReactInputMask from 'react-input-mask';

function MaskInput({ children, ...props }: any) {
	return (
		<ReactInputMask {...props} maskChar=" ">
			{() => children}
		</ReactInputMask>
	);
}

export default MaskInput;
