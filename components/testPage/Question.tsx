import React from 'react';

const Question = ({ dragHandleProps }:any) => {
	return (
		<div
			className='card position-relative rounded-1 d-flex flex-column h-100' 
			style={{ flex: '1 1 auto', overflow: 'hidden' }}>
			{/* Header */}
			<div  className='p-3' style={{ backgroundColor: '#f2f2f2' }}>
				<span {...dragHandleProps}>Question</span>
			</div>

			<div className='flex-grow-1 overflow-auto p-3'>
				You can add middle content here
			</div>

			{/* Footer */}
			<div className='p-3' style={{ backgroundColor: '#f2f2f2' }}>
				Coding-Footer
			</div>
		</div>
	);
};

export default Question;
