import React, { useState } from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Button from '../../../../components/bootstrap/Button';
import showNotification from '../../../../components/extras/showNotification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { College_validation } from '../../../../common/validations/validations';
import {submitCollegeData} from '../../../../common/submissions/submissions'

const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/colleges`;

const index = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			college_name: '',
			college_short_name: '',
			college_image: ''
		},
		validate: (values) => {
			const errors = College_validation(values, 0);
			return errors;
		},
		onSubmit: async () => {
			console.log(formik.values);
			setIsLoading(true);
			const values: any = formik.values;
			try {
				const data = await submitCollegeData(values, endpoint, 0);

				if (data.status == 201) {
					showNotification(
						'Stored Successfully',
						'The College have been successfully Stored.',
						'success',
					);
					values.college_name = '';
					values.college_short_name = '';
					values.college_image = '';
					router.push('/admin/college');
				} else {
					showNotification(
						'Error in Storing',
						'Error in Storing Datas Please Try Again !',
						'danger',
					);
				}
				console.log('Upload success:', data);
			} catch (error: any) {
				if (error.response?.status === 422) {
					const college_error = error.response.data.errors;
					const errors: any = {};

					Object.keys(values).forEach((key) => {
						if (Object.prototype.hasOwnProperty.call(college_error, key)) {
							errors[key] = college_error[key][0];
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
						'Error while storing data. Please try again later.',
						'danger',
					);
				}
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<PageWrapper>
			<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
				<h4 className='fw-semibold m-0'>College</h4>
			</div>
			<Card>
				<CardBody>
					<form>
						<div className='row g-4'>
							<div className='col-12 col-md-4 col-lg-3'>
								<FormGroup id='college_name' label='College name' isFloating>
									<Input
										placeholder='College name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.college_name}
										isValid={formik.isValid}
										isTouched={formik.touched.college_name}
										invalidFeedback={formik.errors.college_name}
									/>
								</FormGroup>
							</div>
							<div className='col-12 col-md-4 col-lg-3'>
								<FormGroup id='college_short_name' label='College short name' isFloating>
									<Input
										type='text'
										placeholder='College short name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.college_short_name}
										isValid={formik.isValid}
										isTouched={formik.touched.college_short_name}
										invalidFeedback={formik.errors.college_short_name}
									// validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>

							<div className='col-12 col-md-4 col-lg-3'>
								<FormGroup
									id='college_image'
									isFloating
									formText='Image should be in WEBP or PNG or JPEG'
									label='Upload the image'>
									<Input
										type='file'
										onChange={(event: any) => {
											const file = event.currentTarget.files?.[0];
											if (file) {
												formik.setFieldValue('college_image', file);
											} else {
												formik.setFieldValue('college_image', ''); // or '' depending on your initial value
											}
										}}
										isValid={formik.isValid}
										isTouched={formik.touched.college_image}
										invalidFeedback={formik.errors.college_image}
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
							<Link href='/admin/college'>
								<Button icon='Cancel' color='danger' isLight className=''>
									Cancel
								</Button>
							</Link>
						</div>
					</form>
				</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default index;
