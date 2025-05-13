import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import Carousel from '../../../components/bootstrap/Carousel';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import { useFormik } from 'formik';
import { login_validations } from '../../../common/validations/validations';
import showNotification from '../../../components/extras/showNotification';

import axios from 'axios';

const index = () => {
	const [amypologo, setAmypologo] = useState<string | null>(null);
	const [carousel1, setcarousel1] = useState<string | null>(null);
	const [carousel2, setcarousel2] = useState<string | null>(null);
	const [carousel3, setcarousel3] = useState<string | null>(null);
	const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/login`;

	useEffect(() => {
		const loadimages = async () => {
			try {
				const logo = await import('../../../assets/img/logo/amypo_trans_logo.png');
				setAmypologo(logo.default);
			} catch (error) {
				setAmypologo(null);
			}

			try {
				const logo = await import('../../../assets/img/login_image/3d1.png');
				setcarousel1(logo.default);
			} catch (error) {
				setcarousel1(null);
			}

			try {
				const logo = await import('../../../assets/img/login_image/3d2.png');
				setcarousel2(logo.default);
			} catch (error) {
				setcarousel2(null);
			}

			try {
				const logo = await import('../../../assets/img/login_image/3d3.png');
				setcarousel3(logo.default);
			} catch (error) {
				setcarousel3(null);
			}
		};

		loadimages();
	}, []);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},

		validate(values) {
			const errors = login_validations(values);
			return errors;
		},

		onSubmit: async (values) => {
			try {
				const value: any = values;
				const response: any = await axios.post(endpoint, value);
				// console.log(response);
			} catch (error: any) {
				if (error.response?.status === 422) {
					const serverErrors = error.response.data.errors;
					formik.setErrors(serverErrors);
				} else {
					showNotification(
						'Request Failed',
						'Something went wrong on the server. Please try again later.',
						'danger',
					);
				}
			}
		},
	});

	return (
		<PageWrapper isProtected={false} className='bg-light'>
			<div className='w-100 h-100'>
				<Head>
					<title>Login</title>
				</Head>
				<div className='p-0 w-100 h-100 d-flex flex-row'>
					<div className='w-100 '>
						<div
							className='w-100 h-100 d-flex align-items-center  justify-content-center bg-success'
							style={{
								marginLeft: '-10px',
								borderTopRightRadius: '70px',
								borderBottomRightRadius: '70px',
							}}>
							<div className='carousel-wrapper'>
								<Carousel
									activeItemIndex={1}
									isRide={true}
									rounded={1}
									isControl={false}
									isSlide={true}
									className='login_slider'>
									<div>
										<div className='caption'>
											<div>
												<div className='px-3'>
													<div className='d-flex align-items-center justify-content-center'>
														<img src={carousel1} alt='' />
													</div>
													<div className='text-center h3 text-white'>
														Propelling Your Dreams !
													</div>
													<div
														className='text-center h5 mt-3 text-white  px-5'
														style={{ marginBottom: '60px' }}>
														Ignite your purpose, pursue your dreams,
														gain knowledge, overcome challenges, embrace
														growth, inspire others, and transform
														through learning.
													</div>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div className='caption'>
											<div>
												<div className='px-3'>
													<div className='d-flex align-items-center justify-content-center'>
														<img src={carousel2} alt='' />
													</div>
													<div className='text-center h3 text-white'>
														Propelling Your Dreams !
													</div>
													<div
														className='text-center h5 mt-3 text-white px-5 '
														style={{ marginBottom: '60px' }}>
														Ignite your purpose, pursue your dreams,
														gain knowledge, overcome challenges, embrace
														growth, inspire others, and transform
														through learning.
													</div>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div className='caption'>
											<div>
												<div className='px-3'>
													<div className='d-flex align-items-center justify-content-center'>
														<img
															className='d-flex align-items-center justify-content-center'
															src={carousel3}
															alt=''
														/>
													</div>
													<div className='text-center h3 text-white'>
														Propelling Your Dreams !
													</div>
													<div
														className='text-center h5 mt-3 text-white  px-5 '
														style={{ marginBottom: '60px' }}>
														Ignite your purpose, pursue your dreams,
														gain knowledge, overcome challenges, embrace
														growth, inspire others, and transform
														through learning.
													</div>
												</div>
											</div>
										</div>
									</div>
								</Carousel>
							</div>
						</div>
					</div>
					<div className='row w-100 h-100 align-items-center justify-content-center'>
						<div className='col-xl-7 col-lg-6 col-md-8 shadow-3d-container'>
							<Card className='shadow-3d-dark' data-tour='login-page'>
								<CardBody>
									<div className='text-start mt-3'>
										<img src={amypologo} width='40%' alt='' />
									</div>

									<div className='text-start h3 fw-bold mt-3'>
										Welcome, to Amypo
									</div>
									<div className='text-start h6 text-muted mb-4 mt-2'>
										Please, Sign in to continue!
									</div>

									<form className='row g-4' onSubmit={formik.handleSubmit}>
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='Your email or username'>
													<Input
														autoComplete='username'
														name='email'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.email}
													/>
													{formik.touched.email &&
														formik.errors.email && (
															<div style={{ color: 'red' }}>
																{formik.errors.email}
															</div>
														)}
												</FormGroup>

												<FormGroup
													id='loginPassword'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='current-password'
														name='password'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.password}
													/>
													{formik.touched.password &&
														formik.errors.password && (
															<div style={{ color: 'red' }}>
																{formik.errors.password}
															</div>
														)}
												</FormGroup>

												<p className='text-end mt-1'>Forget Password ?</p>
											</div>
											<div className='col-12'>
												<Button
													color='success'
													className='w-100 py-3'
													type='submit'>
													Login
												</Button>
											</div>
											<div className='text-start h6 text-muted mb-2 mt-3'>
												Connect With Us ,
											</div>
											<div className='d-flex mt-1 gap-3 mb-3'>
												<a href='#'>
													<svg
														width='30'
														height='30'
														viewBox='0 0 30 30'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<rect
															width='30'
															height='30'
															rx='7'
															fill='#0A66C2'
														/>
														<path
															d='M10.6667 22.5833H7.41675V11.75H10.6667V22.5833ZM22.5834 22.5833H19.3334V16.7962C19.3334 15.2882 18.7961 14.5374 17.7312 14.5374C16.8872 14.5374 16.3521 14.9577 16.0834 15.7995V22.5833H12.8334C12.8334 22.5833 12.8767 12.8333 12.8334 11.75H15.3987L15.597 13.9167H15.6642C16.3304 12.8333 17.3953 12.0988 18.8557 12.0988C19.9661 12.0988 20.8642 12.4076 21.5499 13.1832C22.24 13.96 22.5834 15.0022 22.5834 16.4657V22.5833Z'
															fill='white'
														/>
														<path
															d='M9.04172 10.6667C9.96909 10.6667 10.7209 9.93915 10.7209 9.04169C10.7209 8.14422 9.96909 7.41669 9.04172 7.41669C8.11434 7.41669 7.36255 8.14422 7.36255 9.04169C7.36255 9.93915 8.11434 10.6667 9.04172 10.6667Z'
															fill='white'
														/>
													</svg>
												</a>
												<a href=''>
													<svg
														width='30'
														height='30'
														viewBox='0 0 30 30'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<g clipPath='url(#clip0_57_133)'>
															<path
																d='M22.9688 0H7.03125C3.148 0 0 3.148 0 7.03125V22.9688C0 26.852 3.148 30 7.03125 30H22.9688C26.852 30 30 26.852 30 22.9688V7.03125C30 3.148 26.852 0 22.9688 0Z'
																fill='url(#paint0_radial_57_133)'
															/>
															<path
																d='M22.9688 0H7.03125C3.148 0 0 3.148 0 7.03125V22.9688C0 26.852 3.148 30 7.03125 30H22.9688C26.852 30 30 26.852 30 22.9688V7.03125C30 3.148 26.852 0 22.9688 0Z'
																fill='url(#paint1_radial_57_133)'
															/>
															<path
																d='M15.5843 12.625C14.8218 12.625 14.0905 12.9279 13.5514 13.4671C13.0122 14.0063 12.7093 14.7375 12.7093 15.5C12.7093 16.2625 13.0122 16.9938 13.5514 17.533C14.0905 18.0721 14.8218 18.375 15.5843 18.375C16.3468 18.375 17.0781 18.0721 17.6172 17.533C18.1564 16.9938 18.4593 16.2625 18.4593 15.5C18.4593 14.7375 18.1564 14.0063 17.6172 13.4671C17.0781 12.9279 16.3468 12.625 15.5843 12.625ZM15.5843 10.7084C16.8551 10.7084 18.0739 11.2132 18.9725 12.1118C19.8711 13.0104 20.376 14.2292 20.376 15.5C20.376 16.7709 19.8711 17.9896 18.9725 18.8882C18.0739 19.7869 16.8551 20.2917 15.5843 20.2917C14.3135 20.2917 13.0947 19.7869 12.1961 18.8882C11.2975 17.9896 10.7926 16.7709 10.7926 15.5C10.7926 14.2292 11.2975 13.0104 12.1961 12.1118C13.0947 11.2132 14.3135 10.7084 15.5843 10.7084ZM21.8135 10.4688C21.8135 10.7865 21.6873 11.0912 21.4626 11.3158C21.2379 11.5405 20.9332 11.6667 20.6155 11.6667C20.2978 11.6667 19.9931 11.5405 19.7685 11.3158C19.5438 11.0912 19.4176 10.7865 19.4176 10.4688C19.4176 10.1511 19.5438 9.84637 19.7685 9.62172C19.9931 9.39706 20.2978 9.27085 20.6155 9.27085C20.9332 9.27085 21.2379 9.39706 21.4626 9.62172C21.6873 9.84637 21.8135 10.1511 21.8135 10.4688ZM15.5843 7.83335C13.2134 7.83335 12.8262 7.84006 11.7232 7.88894C10.9718 7.9244 10.4678 8.02502 10.0001 8.2071C9.60892 8.35121 9.25519 8.58146 8.96508 8.88081C8.66539 9.17082 8.4348 9.52456 8.29042 9.91581C8.10833 10.3854 8.00771 10.8885 7.97321 11.6389C7.92338 12.6969 7.91667 13.0668 7.91667 15.5C7.91667 17.8719 7.92338 18.2581 7.97225 19.3611C8.00771 20.1115 8.10833 20.6166 8.28946 21.0833C8.45237 21.5001 8.64404 21.8001 8.96221 22.1183C9.28517 22.4403 9.58513 22.6329 9.99721 22.792C10.4706 22.975 10.9747 23.0766 11.7222 23.1111C12.7802 23.1609 13.1501 23.1667 15.5833 23.1667C17.9552 23.1667 18.3414 23.16 19.4445 23.1111C20.1939 23.0756 20.698 22.975 21.1666 22.7939C21.5577 22.6498 21.9115 22.4195 22.2016 22.1202C22.5245 21.7982 22.7172 21.4982 22.8763 21.0852C23.0583 20.6137 23.1599 20.1096 23.1944 19.3602C23.2442 18.3031 23.25 17.9323 23.25 15.5C23.25 13.1291 23.2433 12.7419 23.1944 11.6389C23.159 10.8895 23.0574 10.3835 22.8763 9.91581C22.7321 9.52465 22.5019 9.17092 22.2025 8.88081C21.9125 8.58112 21.5588 8.35053 21.1675 8.20615C20.698 8.02406 20.1939 7.92344 19.4445 7.88894C18.3874 7.8391 18.0175 7.83335 15.5833 7.83335M15.5833 5.91669C18.1871 5.91669 18.512 5.92627 19.5345 5.97419C20.5542 6.0221 21.25 6.18215 21.8604 6.41981C22.4929 6.66323 23.0258 6.9929 23.5586 7.52477C24.0461 8.00368 24.4232 8.58322 24.6635 9.22294C24.9003 9.8334 25.0613 10.5291 25.1092 11.5498C25.1542 12.5714 25.1667 12.8962 25.1667 15.5C25.1667 18.1038 25.1571 18.4287 25.1092 19.4503C25.0613 20.4719 24.9003 21.1657 24.6635 21.7771C24.4232 22.4168 24.0461 22.9964 23.5586 23.4753C23.0797 23.9628 22.5001 24.3399 21.8604 24.5802C21.25 24.8169 20.5542 24.9779 19.5345 25.0259C18.512 25.0709 18.1871 25.0834 15.5833 25.0834C12.9795 25.0834 12.6547 25.0738 11.6321 25.0259C10.6125 24.9779 9.91767 24.8169 9.30625 24.5802C8.66654 24.3399 8.08699 23.9628 7.60808 23.4753C7.12059 22.9964 6.74349 22.4168 6.50313 21.7771C6.26546 21.1666 6.10542 20.4709 6.0575 19.4503C6.0115 18.4287 6 18.1038 6 15.5C6 12.8962 6.00958 12.5714 6.0575 11.5498C6.10542 10.5282 6.26546 9.83435 6.50313 9.22294C6.74349 8.58322 7.12059 8.00368 7.60808 7.52477C8.08699 7.03727 8.66654 6.66018 9.30625 6.41981C9.91671 6.18215 10.6115 6.0221 11.6321 5.97419C12.6556 5.92915 12.9805 5.91669 15.5843 5.91669'
																fill='white'
															/>
														</g>
														<defs>
															<radialGradient
																id='paint0_radial_57_133'
																cx='0'
																cy='0'
																r='1'
																gradientUnits='userSpaceOnUse'
																gradientTransform='translate(7.96875 32.3106) rotate(-90) scale(29.7322 27.6533)'>
																<stop stopColor='#FFDD55' />
																<stop
																	offset='0.1'
																	stopColor='#FFDD55'
																/>
																<stop
																	offset='0.5'
																	stopColor='#FF543E'
																/>
																<stop
																	offset='1'
																	stopColor='#C837AB'
																/>
															</radialGradient>
															<radialGradient
																id='paint1_radial_57_133'
																cx='0'
																cy='0'
																r='1'
																gradientUnits='userSpaceOnUse'
																gradientTransform='translate(-5.02512 2.16105) rotate(78.681) scale(13.2905 54.7837)'>
																<stop stopColor='#3771C8' />
																<stop
																	offset='0.128'
																	stopColor='#3771C8'
																/>
																<stop
																	offset='1'
																	stopColor='#6600FF'
																	stopOpacity='0'
																/>
															</radialGradient>
															<clipPath id='clip0_57_133'>
																<rect
																	width='30'
																	height='30'
																	fill='white'
																/>
															</clipPath>
														</defs>
													</svg>
												</a>
												<a href='#'>
													<svg
														width='30'
														height='30'
														viewBox='0 0 30 30'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<rect
															width='30'
															height='30'
															rx='7'
															fill='#FF0000'
														/>
														<path
															d='M20.812 8.01699H9.145C6.855 8.01699 5 9.85199 5 12.116V17.884C5 20.148 6.856 21.984 9.145 21.984H20.812C23.102 21.984 24.957 20.148 24.957 17.884V12.116C24.957 9.85199 23.101 8.01599 20.812 8.01599V8.01699ZM18.009 15.28L12.552 17.855C12.5187 17.8707 12.482 17.8779 12.4452 17.8757C12.4084 17.8736 12.3727 17.8622 12.3415 17.8427C12.3102 17.8232 12.2844 17.7962 12.2663 17.7641C12.2482 17.732 12.2385 17.6958 12.238 17.659V12.35C12.2387 12.3129 12.2487 12.2765 12.2672 12.2443C12.2857 12.2121 12.3121 12.1851 12.3438 12.1659C12.3756 12.1466 12.4117 12.1357 12.4488 12.1341C12.4859 12.1326 12.5228 12.1404 12.556 12.157L18.014 14.892C18.0504 14.9101 18.0809 14.9381 18.102 14.9728C18.1232 15.0075 18.1341 15.0474 18.1336 15.0881C18.1331 15.1287 18.1211 15.1683 18.0991 15.2025C18.077 15.2366 18.0458 15.2628 18.009 15.28Z'
															fill='white'
														/>
													</svg>
												</a>
												<a href='#'>
													<svg
														width='30'
														height='30'
														viewBox='0 0 30 30'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<rect
															width='30'
															height='30'
															rx='7'
															fill='#1877F2'
														/>
														<g clipPath='url(#clip0_57_142)'>
															<path
																d='M15 6C17.2821 5.99865 19.4796 6.86435 21.1477 8.42189C22.8157 9.97944 23.8297 12.1125 23.9846 14.3894C24.1394 16.6663 23.4234 18.9171 21.9816 20.6861C20.5397 22.4551 18.4797 23.6103 16.2183 23.9179V17.4435H18.5471L18.9138 15.0664H16.2183V13.7659C16.2183 12.8333 16.5052 11.9996 17.3107 11.9096L17.4592 11.9018H18.9363V9.82613L18.609 9.78563C18.294 9.75188 17.8091 9.71363 17.0902 9.71363C14.9977 9.71363 13.74 10.7891 13.659 13.227L13.6545 13.4835V15.0675H11.4281V17.4446H13.6556V23.9021C11.4122 23.5609 9.38038 22.385 7.96687 20.6097C6.55337 18.8345 5.86244 16.591 6.03237 14.3281C6.2023 12.0653 7.22056 9.95005 8.88334 8.40584C10.5461 6.86164 12.7307 6.00237 15 6Z'
																fill='white'
															/>
														</g>
														<defs>
															<clipPath id='clip0_57_142'>
																<rect
																	width='18'
																	height='18'
																	fill='white'
																	transform='translate(6 6)'
																/>
															</clipPath>
														</defs>
													</svg>
												</a>
												<a href='#'>
													<svg
														width='30'
														height='30'
														viewBox='0 0 30 30'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<rect
															width='30'
															height='30'
															rx='7'
															fill='#3B3C3E'
														/>
														<g clipPath='url(#clip0_57_145)'>
															<mask
																id='mask0_57_145'
																maskUnits='userSpaceOnUse'
																x='8'
																y='7'
																width='15'
																height='15'>
																<path
																	d='M8 7H23V22H8V7Z'
																	fill='white'
																/>
															</mask>
															<g mask='url(#mask0_57_145)'>
																<path
																	d='M19.8125 7.70288H22.1129L17.0879 13.4607L23 21.2972H18.3714L14.7436 16.5454L10.5971 21.2972H8.29464L13.6689 15.1365L8 7.70395H12.7464L16.0207 12.0465L19.8125 7.70288ZM19.0036 19.9172H20.2786L12.05 9.0111H10.6829L19.0036 19.9172Z'
																	fill='white'
																/>
															</g>
														</g>
														<defs>
															<clipPath id='clip0_57_145'>
																<rect
																	width='15'
																	height='15'
																	fill='white'
																	transform='translate(8 7)'
																/>
															</clipPath>
														</defs>
													</svg>
												</a>
											</div>
										</>
									</form>
								</CardBody>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default index;
