import React, { useState } from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Select from '../../../../components/bootstrap/forms/Select';
import Button from '../../../../components/bootstrap/Button';
import {LanguageCategories} from '../../../../common/data/commonDatas';
import showNotification from '../../../../components/extras/showNotification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {Language_validation} from '../../../../common/validations/validations';
import {submitLanguageData} from '../../../../common/submissions/submissions';

const SELECT_OPTIONS = LanguageCategories;
const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages`;

const Index: React.FC = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			lang_name: '',
			lang_id: '',
			lang_category: '',
			lang_image: '',
		},
		validate: (values) => {
			const errors = Language_validation(values ,0);
			return errors;
		},
		onSubmit: async () => {
			console.log(formik.values);
			setIsLoading(true);
			const values: any = formik.values;
			try {
				const data = await submitLanguageData(values, endpoint ,0);

				if (data.status == 201) {
					showNotification(
						'Stored Successfully',
						'The Language have been successfully Stored.',
						'success',
					);
					values.lang_name = '';
					values.lang_id = '';
					values.lang_category = '';
					values.lang_image = '';
					router.push('/admin/languages');
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
				<h4 className='fw-semibold m-0'>Language</h4>
			</div>
			<Card>
				<CardBody>
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
				</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default Index;
