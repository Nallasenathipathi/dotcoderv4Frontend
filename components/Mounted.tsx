import React, { ReactNode } from 'react';
import useMounted from '../hooks/useMounted';

interface IMountedProps {
	children: ReactNode;
}
// const Mounted: FC<IMountedProps> = ({ children }) => {
// 	const { mounted } = useMounted();

// 	if (mounted) return <>{children}</>;
// 	return null;
// };

const Mounted = (children: IMountedProps) => {
	const { mounted } = useMounted();

	if (mounted) return <>{children.children}</>;
	return null;
};

export default Mounted;
