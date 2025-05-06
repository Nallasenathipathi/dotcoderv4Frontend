import React, { useEffect } from 'react';
import Solution from '../../../components/testPage/Solution';
import { createSwapy } from 'swapy';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Question from '../../../components/testPage/Question';

const IndexPage: React.FC = () => {
	useEffect(() => {
		const container = document.querySelector('.swap-container') as HTMLElement | null;

		if (container) {
			const swapy = createSwapy(container, {
				animation: 'dynamic', // or 'spring' or 'none'
			});

			swapy.enable(true);

			return () => {
				swapy.destroy();
			};
		}
	}, []);
	let data:any = `data-swapy-handle style={{ cursor: 'grab' }}`

	return (
		<div
			className='swap-container w-100 overflow-x-hidden p-2'
			style={{
				height: "100vh", // Make it fixed to viewport height
				width: "100vw",
				backgroundColor: '#c7c7c5',
				overflow: 'hidden', // Prevent any scroll
			}}
		>
			<div className='w-100 h-100 d-flex flex-column'>
				<div className='row' style={{ flex: '0 0 auto' }}>
					<div className='col-12'>
						<div className='rounded-1 w-100'>
							<header className='px-3 py-3'>Header</header>
						</div>
					</div>
				</div>

				<div style={{ flex: '1 1 auto', minHeight: 0 }}>
					<PanelGroup autoSaveId='example' direction='horizontal'>
						<Panel defaultSize={25}>
							<div className='h-100' data-swapy-slot='sd'>
								<div className='content-a h-100' data-swapy-item='c'>
									<Question dragHandleProps={{ 'data-swapy-handle': true, style: { cursor: 'grab' } }} />
								</div>
							</div>
						</Panel>
						<PanelResizeHandle
							className='my-2 bg-gray-300'
							style={{ width: '8px', cursor: 'row-resize' }}
						/>
						<Panel>
							<PanelGroup autoSaveId='example' direction='vertical'>
								<Panel defaultSize={25}>
									<div className='h-100' data-swapy-slot='foo'>
										<div className='content-a h-100' data-swapy-item='a'>
											<Solution dragHandleProps={{ 'data-swapy-handle': true, style: { cursor: 'grab' } }}/>
										</div>
									</div>
								</Panel>
								<PanelResizeHandle
									className='my-2 bg-gray-300'
									style={{ height: '1px', cursor: 'row-resize' }}
								/>
								<Panel>
									<div className='h-100' data-swapy-slot='bar'>
										<div className='content-b h-100' data-swapy-item='b'>
											<Question dragHandleProps={{ 'data-swapy-handle': true, style: { cursor: 'grab' } }}/>
										</div>
									</div>
								</Panel>
							</PanelGroup>
						</Panel>
					</PanelGroup>
				</div>
			</div>
		</div>

	);
};

export default IndexPage;
