import React from 'react';
import classNames from 'classnames';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
} from '../../../components/bootstrap/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import Nav, { NavItem } from '../../../components/bootstrap/Nav';
import Link from 'next/link';
import Button from '../../../components/bootstrap/Button';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import banner_img from '../../../assets/img/coder_assets/prepare.png';

const My_accordian = () => {
	const { darkModeStatus } = useDarkMode();

	return (
		<PageWrapper className='active_course_bg'>
			<main className='active_course'>
				<div className='row g-4'>
					<div className='col-lg-4 my_accordian'>
						<Card
							className='m-0 rounded-bottom-0'
							style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
							<div
								className='d-flex align-items-center'
								style={{ marginLeft: '20px' }}>
								<div className=''>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='32'
										height='32'
										viewBox='0 0 24 24'>
										<g fill='none'>
											<rect
												width='16'
												height='18'
												x='4'
												y='3'
												fill='#46bcaa'
												// fill-opacity='.25'
												rx='2'
											/>
											<path
												stroke='#46bcaa'
												// stroke-linecap='round'
												d='M8.5 6.5h7m-7 3h4m-4 3h6'
											/>
											<path
												fill='#46bcaa'
												d='M4 19a2 2 0 0 1 2-2h11c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C20 15.398 20 14.932 20 14v3c0 1.886 0 2.828-.586 3.414S17.886 21 16 21H6a2 2 0 0 1-2-2'
											/>
										</g>
									</svg>
								</div>
								<div
									className={classNames(
										'px-1 py-3 text-success',
										{
											'bg-p': !darkModeStatus,
											'bg-w': darkModeStatus,
										},
										'activestyle.testing',
									)}
									style={{
										fontSize: '16px',
										fontWeight: '600',
										marginTop: '4px',
										borderTopLeftRadius: '8px',
										borderTopRightRadius: '8px',
									}}>
									Programming using c++
								</div>
							</div>
						</Card>

						<Accordion
							id='accSample-2'
							className='rounded-top-0 topic_course'
							shadow='default'>
							<AccordionItem
								overWriteColor='success'
								id='accor1-1'
								title={
									<div>
										<div
											className='text-base font-medium topic '
											style={{ fontSize: '15px', fontWeight: '600' }}>
											Basics of C Programming
										</div>
										<div
											className='text-sm'
											style={{
												fontSize: '12px',
												fontWeight: '500',
												marginTop: '4px',
											}}>
											3 Topics
										</div>
									</div>
								}>
								<div className='ac_card-body' style={{ marginLeft: '20px' }}>
									<div className='list'>
										<span className='step-indicator'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'>
												<path d='M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.414 3.87 3.876 9.87-9.876z' />
											</svg>
										</span>
										<h5 style={{ fontSize: '15px', fontWeight: '600' }}>
											Variables and Datatypes
										</h5>
										<div className='d-flex align-items-center gap-1'>
											<div>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='22'
													height='22'
													viewBox='0 0 24 24'>
													<path
														fill='#46bcaa'
														d='M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.4 3.4 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143m10.75 4.25a3.4 3.4 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.5 3.5 0 0 1-.924.37z'
													/>
												</svg>
											</div>{' '}
											<h6 className='m-0'>Completed</h6>
										</div>
									</div>
									<div className='list'>
										<h5 style={{ fontSize: '15px', fontWeight: '600' }}>
											Variables and Datatypes
										</h5>
										<div className='d-flex align-items-center gap-1'>
											<div>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='22'
													height='22'
													viewBox='0 0 24 24'>
													<path
														fill='#46bcaa'
														d='M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.4 3.4 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143m10.75 4.25a3.4 3.4 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.5 3.5 0 0 1-.924.37z'
													/>
												</svg>
											</div>{' '}
											<h6 className='m-0'>Completed</h6>
										</div>
									</div>
								</div>
							</AccordionItem>
							<AccordionItem
								overWriteColor='success'
								id='accor1-2'
								title={
									<div>
										<div
											className='text-base font-medium topic '
											style={{ fontSize: '15px', fontWeight: '600' }}>
											Basics of C Programming
										</div>
										<div
											className='text-sm'
											style={{
												fontSize: '12px',
												fontWeight: '500',
												marginTop: '4px',
											}}>
											3 Topics
										</div>
									</div>
								}>
								<div className='ac_card-body' style={{ marginLeft: '20px' }}>
									<div className='list'>
										<span className='step-indicator'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'>
												<path d='M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.414 3.87 3.876 9.87-9.876z' />
											</svg>
										</span>
										<h5 style={{ fontSize: '15px', fontWeight: '600' }}>
											Variables and Datatypes
										</h5>
										<div className='d-flex align-items-center gap-1'>
											<div>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='22'
													height='22'
													viewBox='0 0 24 24'>
													<path
														fill='#46bcaa'
														d='M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.4 3.4 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143m10.75 4.25a3.4 3.4 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.5 3.5 0 0 1-.924.37z'
													/>
												</svg>
											</div>{' '}
											<h6 className='m-0'>Completed</h6>
										</div>
									</div>
									<div className='list'>
										<h5 style={{ fontSize: '15px', fontWeight: '600' }}>
											Variables and Datatypes
										</h5>
										<div className='d-flex align-items-center gap-1'>
											<div>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='22'
													height='22'
													viewBox='0 0 24 24'>
													<path
														fill='#46bcaa'
														d='M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.4 3.4 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143m10.75 4.25a3.4 3.4 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.5 3.5 0 0 1-.924.37z'
													/>
												</svg>
											</div>{' '}
											<h6 className='m-0'>Completed</h6>
										</div>
									</div>
								</div>
							</AccordionItem>
							<AccordionItem
								overWriteColor='success'
								id='accor1-3'
								title={
									<div>
										<div
											className='text-base font-medium topic '
											style={{ fontSize: '15px', fontWeight: '600' }}>
											Basics of C Programming
										</div>
										<div
											className='text-sm'
											style={{
												fontSize: '12px',
												fontWeight: '500',
												marginTop: '4px',
											}}>
											3 Topics
										</div>
									</div>
								}>
								<div className='ac_card-body' style={{ marginLeft: '20px' }}>
									<div className='list'>
										<span className='step-indicator'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'>
												<path d='M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.414 3.87 3.876 9.87-9.876z' />
											</svg>
										</span>
										<h5 style={{ fontSize: '15px', fontWeight: '600' }}>
											Variables and Datatypes
										</h5>
										<div className='d-flex align-items-center gap-1'>
											<div>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='22'
													height='22'
													viewBox='0 0 24 24'>
													<path
														fill='#46bcaa'
														d='M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.4 3.4 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143m10.75 4.25a3.4 3.4 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.5 3.5 0 0 1-.924.37z'
													/>
												</svg>
											</div>{' '}
											<h6 className='m-0'>Completed</h6>
										</div>
									</div>
									<div className='list'>
										<span className='step-indicator'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'>
												<path d='M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.414 3.87 3.876 9.87-9.876z' />
											</svg>
										</span>
										<h5 style={{ fontSize: '15px', fontWeight: '600' }}>
											Variables and Datatypes
										</h5>
										<div className='d-flex align-items-center gap-1'>
											<div>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='22'
													height='22'
													viewBox='0 0 24 24'>
													<path
														fill='#46bcaa'
														d='M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.4 3.4 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143m10.75 4.25a3.4 3.4 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.5 3.5 0 0 1-.924.37z'
													/>
												</svg>
											</div>{' '}
											<h6 className='m-0'>Completed</h6>
										</div>
									</div>
								</div>
							</AccordionItem>
						</Accordion>
					</div>
					<div className='col-lg-8'>
						<Card className='ac_main'>
							<CardHeader borderSize={1}>
								<CardLabel iconColor='info'>
									<div className='d-flex  gap-2 align-items-center'>
										<div
											style={{
												backgroundColor: '#e6e6e6',
												borderRadius: '5px',
												padding: '2px',
											}}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='22'
												height='22'
												viewBox='0 0 24 24'>
												<path
													fill='#46bcaa'
													d='M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42'
												/>
											</svg>
										</div>
										<div
											className=''
											style={{
												border: '1px solid #e6e6e6',
												borderRadius: '5px',
												padding: '2px',
											}}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='18'
												height='18'
												viewBox='0 0 24 24'>
												<g fill='none'>
													<path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
													<path
														fill='#46bcaa'
														d='M10.8 2.65a2 2 0 0 1 2.4 0l7 5.25a2 2 0 0 1 .8 1.6V19a2 2 0 0 1-2 2h-4.9a1.1 1.1 0 0 1-1.1-1.1V14a1 1 0 1 0-2 0v5.9A1.1 1.1 0 0 1 9.9 21H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 .8-1.6zm1.2 1.6L5 9.5V19h4v-5a3 3 0 1 1 6 0v5h4V9.5z'
													/>
												</g>
											</svg>
										</div>
										<div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='18'
												height='18'
												viewBox='0 0 24 24'>
												<path
													fill='#ccc'
													d='M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42'
												/>
											</svg>
										</div>
										<div>
											<p className='m-0 text-success'>Prepare</p>
										</div>
									</div>
								</CardLabel>
								<CardActions>
								<Button
							color='info'
							icon='CloudDownload'
							isLight
							tag='a'
							to='/somefile.txt'
							target='_blank'
							download>
							Dashboard
						</Button>

						<Button	
						color='success'
						isLight
						
						icon='Star'
						shadow='none'
						hoverShadow='lg'>
						Prepare
						</Button>
						<Button	
						color='secondary'
						isLight
						
						icon='Star'
						shadow='none'
						hoverShadow='lg'>
						Challenge Yourself
						</Button>
						<Button	
						color='info'
						isLight
						
						icon='Star'
						shadow='none'
						hoverShadow='lg'>
						Revision
						</Button>
						<Button	
						color='warning'
						isLight
						
						icon='Star'
						shadow='none'
						hoverShadow='lg'>
						Discussion
						</Button>
						

								</CardActions>
								
							</CardHeader>
							<CardHeader borderSize={1}>
								<CardLabel iconColor='info'>
									<div className='d-flex  gap-2 align-items-center'>
										<div
											style={{
												backgroundColor: '#e6e6e6',
												borderRadius: '5px',
												padding: '2px',
											}}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='22'
												height='22'
												viewBox='0 0 24 24'>
												<path
													fill='#46bcaa'
													d='M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42'
												/>
											</svg>
										</div>
										<div
											className=''
											style={{
												border: '1px solid #e6e6e6',
												borderRadius: '5px',
												padding: '2px',
											}}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='18'
												height='18'
												viewBox='0 0 24 24'>
												<g fill='none'>
													<path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
													<path
														fill='#46bcaa'
														d='M10.8 2.65a2 2 0 0 1 2.4 0l7 5.25a2 2 0 0 1 .8 1.6V19a2 2 0 0 1-2 2h-4.9a1.1 1.1 0 0 1-1.1-1.1V14a1 1 0 1 0-2 0v5.9A1.1 1.1 0 0 1 9.9 21H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 .8-1.6zm1.2 1.6L5 9.5V19h4v-5a3 3 0 1 1 6 0v5h4V9.5z'
													/>
												</g>
											</svg>
										</div>
										<div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='18'
												height='18'
												viewBox='0 0 24 24'>
												<path
													fill='#ccc'
													d='M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42'
												/>
											</svg>
										</div>
										<div>
											<p className='m-0 text-success'>Prepare</p>
										</div>
									</div>
								</CardLabel>
								<CardActions>
								<Button color='primary' icon='CloudDownload' hoverShadow='lg' isLink isActive>
											Dashboard
										</Button>
								
										<Button color='success' icon='Star' hoverShadow='lg' isActive>
										Prepare
										</Button>			
						
										<Button color='secondary' icon='CloudDownload' hoverShadow='lg' isLink isActive>
											Challenge Yourself
										</Button>
										<Button color='info' icon='CloudDownload' hoverShadow='lg' isLink isActive>
											Revision
										</Button>
										<Button color='warning' icon='CloudDownload' hoverShadow='lg' isLink isActive>
											Discussion
										</Button>
										

					
						

								</CardActions>
								
							</CardHeader>
							<CardBody className='table-responsive card-body-scrollable ac_right_section'>
							<img className='w-100 rounded-2'  src={banner_img} alt="" />								
							<div>
								Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy text
									ever since the 1500s, when an unknown printer took a galley of type
									and scrambled it to make a type specimen book. It has survived not
									only five centuries, but also the leap into electronic typesetting,
									remaining essentially unchanged. It was popularised in the 1960s
									with the release of Letraset sheets containing Lorem Ipsum passages,
									and more recently with desktop publishing software like Aldus
									PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply
									dummy text of the printing and typesetting industry. Lorem Ipsum has
									been the industry's standard dummy text ever since the 1500s, when
									an unknown printer took a galley of type and scrambled it to make a
									type specimen book. It has survived not only five centuries, but
									also the leap into electronic typesetting, remaining essentially
									unchanged. It was popularised in the 1960s with the release of
									Letraset sheets containing Lorem Ipsum passages, and more recently
									with desktop publishing software like Aldus PageMaker including
									versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled it to make a type
									specimen book. It has survived not only five centuries, but also the
									leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, and more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's standard
									dummy text ever since the 1500s, when an unknown printer took a
									galley of type and scrambled it to make a type specimen book. It has
									survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in
									the 1960s with the release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing software like
									Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is
									simply dummy text of the printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy text ever since the
									1500s, when an unknown printer took a galley of type and scrambled
									it to make a type specimen book. It has survived not only five
									centuries, but also the leap into electronic typesetting, remaining
									essentially unchanged. It was popularised in the 1960s with the
									release of Letraset sheets containing Lorem Ipsum passages, and more
									recently with desktop publishing software like Aldus PageMaker
									including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text
									of the printing and typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled it to make a type
									specimen book. It has survived not only five centuries, but also the
									leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, and more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's standard
									dummy text ever since the 1500s, when an unknown printer took a
									galley of type and scrambled it to make a type specimen book. It has
									survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in
									the 1960s with the release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing software like
									Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is
									simply dummy text of the printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy text ever since the
									1500s, when an unknown printer took a galley of type and scrambled
									it to make a type specimen book. It has survived not only five
									centuries, but also the leap into electronic typesetting, remaining
									essentially unchanged. It was popularised in the 1960s with the
									release of Letraset sheets containing Lorem Ipsum passages, and more
									recently with desktop publishing software like Aldus PageMaker
									including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text
									of the printing and typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled it to make a type
									specimen book. It has survived not only five centuries, but also the
									leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, and more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's standard
									dummy text ever since the 1500s, when an unknown printer took a
									galley of type and scrambled it to make a type specimen book. It has
									survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in
									the 1960s with the release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing software like
									Aldus PageMaker including versions of Lorem Ipsum.
							</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</main>
		</PageWrapper>
	);
};
export default My_accordian;
