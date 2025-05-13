import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Select from '../../../../../components/bootstrap/forms/Select';
import Button from '../../../../../components/bootstrap/Button';
import {LanguageCategories} from '../../../../../common/data/commonDatas';
import showNotification from '../../../../../components/extras/showNotification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Language_validation} from '../../../../../common/validations/validations';
import {submitLanguageData, fetchData} from '../../../../../common/submissions/submissions'

const SELECT_OPTIONS = LanguageCategories;
let endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages/1`;
let lang_id: any;
let lang_img_path = ""; 

const Index: React.FC = () => {

	const router = useRouter();

	const { slug } = router.query;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	if (slug && Array.isArray(slug)) {
		lang_id = slug[slug.length - 1];
		endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages/${lang_id}`;
	}

	const formik = useFormik({
		initialValues: {
			lang_name: '',
			lang_id: '',
			lang_category: '',
			old_lang_img:'',
			lang_image: '',
		},
		validate: (values) => {
			const errors = Language_validation(values ,1);
			return errors;
		},
		onSubmit: async () => {
			console.log(formik.values);
			setIsLoading(true);
			const values: any = formik.values;
			try {
				const data = await submitLanguageData(values, endpoint, 1);
				console.log(data);

				if (data.status == 200) {
					showNotification(
						'Updated Successfully',
						'The Language have been successfully Updated.',
						'success',
					);
					values.lang_name = '';
					values.lang_id = '';
					values.lang_category = '';
					values.old_lang_img = '';
					values.lang_image = '';
					router.push('/admin/languages');
				} else {
					showNotification(
						'Error in Updated',
						'Error in Updated Datas Please Try Again !',
						'danger',
					);
				}
				console.log('Upload success:', data);
			} catch (error: any) {
				console.log(error);
				
				if (error.response?.status === 422) {
					const lang_error = error.response.data.errors;
					const errors: any = {};

					Object.keys(values).forEach((key) => {
						if (Object.prototype.hasOwnProperty.call(lang_error, key)) {
							errors[key] = lang_error[key][0];
						}
					});
					formik.setErrors(errors);
				} else if (error.response?.status === 401) {
					showNotification(
						'Session Expired',
						'Please login again!',
						'danger',
					);
					router.push('/auth-pages/new-login');
				} else {
					showNotification(
						'Server Error',
						'Error while Updated data. Please try again later.',
						'danger',
					);
				}
			} finally {
				setIsLoading(false);
			}
		},
	});

	const fetchinitialData = async () => {
		try {
			const data = await fetchData(endpoint);
			console.log(data);
			
			if (data?.status === 200) {
				formik.setValues({
					lang_name: data.data.lang_name || '',
					lang_id: data.data.lang_id || '',
					lang_category: data.data.lang_category || '',
					old_lang_img: data.data.lang_image || '',
					lang_image: '',
				});
				lang_img_path = data.data.lang_image;
				setIsLoading(false);
			} else {
				showNotification('Error', 'Failed to fetch languages', 'danger');
			}
		} catch (error: any) {
			if (error?.status === 401) {
				showNotification('Session Expired', 'Please login again', 'danger');
			} else {
				showNotification('Network Error', 'Could not connect to the server Please Try Again!', 'danger');
			}
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchinitialData();
	}, []);

	return (
		<PageWrapper>
			<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
				<h4 className='fw-semibold m-0'>Language</h4>
			</div>
			<Card>
				<CardBody>
					{!isFetching ? (
						<form>
							<div className='row g-4'>
								<div className='col-12 col-md-4 col-lg-3'>
									<FormGroup id='lang_name' label='Language name' isFloating>
										<Input
											placeholder='Language name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.lang_name}
											isValid={formik.isValid}
											isTouched={formik.touched.lang_name}
											invalidFeedback={formik.errors.lang_name}
										/>
									</FormGroup>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<FormGroup id='lang_id' label='Language Id' isFloating>
										<Input
											type='number'
											placeholder='Language Id'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.lang_id}
											isValid={formik.isValid}
											isTouched={formik.touched.lang_id}
											invalidFeedback={formik.errors.lang_id}
										// validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>

								<div className='col-12 col-md-4 col-lg-3'>
									<FormGroup id='lang_category' label='Language category' isFloating>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={formik.handleChange}
											value={formik.values.lang_category}
											onBlur={formik.handleBlur}
											list={SELECT_OPTIONS}
											isValid={formik.isValid}
											isTouched={formik.touched.lang_category}
											invalidFeedback={formik.errors.lang_category}
										/>
									</FormGroup>
								</div>

								<div className='col-12 col-md-4 col-lg-3'>
									<FormGroup
										id='lang_image'
										isFloating
										formText='Image should be in WEBP or PNG or JPEG'
										label='Upload the image'>
										<Input
											type='file'
											onChange={(event: any) => {
												const file = event.currentTarget.files?.[0];
												if (file) {
													formik.setFieldValue('lang_image', file);
												} else {
													formik.setFieldValue('lang_image', ''); // or '' depending on your initial value
												}
											}}
											isValid={formik.isValid}
											isTouched={formik.touched.lang_image}
											invalidFeedback={formik.errors.lang_image}
										/>
										<img
											src={lang_img_path}
											width='30%'
											alt='Image not available Please Upload again!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='d-flex gap-3 align-itms-center justify-content-center mt-3'>
								<Button
									type='submit'
									icon='PublishedWithChanges'
									color='success'
									isLight
									className=''
									onClick={formik.handleSubmit}
									isDisable={(!formik.isValid && !!formik.submitCount) || isLoading}>
									{!isLoading ? <span>save</span> : <span>Storing Dats...</span>}
								</Button>
								<Link href='/admin/languages'>
									<Button icon='Cancel' color='danger' isLight className=''>
										Cancel
									</Button>
								</Link>
							</div>
						</form>
					) : (
						<div>Fetching datas</div>
					)}

				</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default Index;
