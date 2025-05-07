import React from 'react';
import MonachoEditor from '../editors/MonachoEditor';

const Solution = ({ dragHandleProps }: any) => {
	return (
		<div
			className=' rounded-1 bg-white d-flex flex-column h-100'
			style={{ flex: '1 1 auto', overflow: 'hidden' }}>
			{/* Header */}
			<div className='p-3' style={{ backgroundColor: '#f2f2f2' }}>
				<span {...dragHandleProps}>Code</span>
			</div>

			<div className='flex-grow-1 overflow-auto '>
				<MonachoEditor />
			</div>

			{/* Footer */}
			<div className='p-3' style={{ backgroundColor: '#f2f2f2' }}>
				Coding-Footer
			</div>
		</div>
	);
};

export default Solution;
