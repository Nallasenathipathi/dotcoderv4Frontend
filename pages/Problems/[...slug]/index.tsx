import React, { useEffect } from 'react';
import Solution from '../../../components/testPage/Solution';
import { createSwapy } from 'swapy';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Question from '../../../components/testPage/Question';

const IndexPage: React.FC = () => {
	useEffect(() => {
		const container = document.querySelector('.container') as HTMLElement | null;

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

	return (
		<div className='container h-100 ' style={{ backgroundColor: '#c7c7c5' }}>
			<div className=' h-100'>
				<div className='row h-10'>
					<div className='col-12 col-md-12 section-1'>
						<div>
							{/* <Solution Solution='container A' /> */}
							<div className='card rounded-1 h-100 w-100'>
								<header className='bg-primary rounded-top px-3 py-3'>Header</header>
							</div>
						</div>
					</div>
				</div>
				<PanelGroup autoSaveId='example' direction='horizontal'>
					<Panel defaultSize={25}>
						<div className='h-100' data-swapy-slot='sd'>
							<div className='content-a h-100' data-swapy-item='c'>
								<Question />
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
										<Solution />
									</div>
								</div>
							</Panel>
							<PanelResizeHandle
								className='my-2 bg-gray-300'
								style={{ height: '8px', cursor: 'row-resize' }}
							/>
							<Panel>
								<div className='h-100' data-swapy-slot='bar'>
									<div className='content-b ' data-swapy-item='b'>
										<Question />
										{/* <div className="handle" data-swapy-handle = "b"></div> */}
									</div>
								</div>
							</Panel>
						</PanelGroup>
					</Panel>
				</PanelGroup>
			</div>
		</div>
	);
};

export default IndexPage;
