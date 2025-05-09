import React, { useState } from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Select from '../../../../components/bootstrap/forms/Select';
import Button from '../../../../components/bootstrap/Button';
import LanguageCategories from '../../../../common/data/commonDatas';
import axios from 'axios';
import showNotification from '../../../../components/extras/showNotification';
import Link from 'next/link';

const Index: React.FC = () => {
	const SELECT_OPTIONS = LanguageCategories;
	const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages`;

	// console.log(endpoint);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			lang_name: '',
			lang_id: '',
			lang_category: '',
			lang_image: '',
		},
		validate: (values) => {
			const errors: any = {};

			if (!values.lang_name) {
				errors.lang_name = 'Language name is required';
			}
			if (!values.lang_id) {
				errors.lang_id = 'Language ID is required';
			}
			if (!values.lang_category) {
				errors.lang_category = 'Language category is required';
			}
			if (!values.lang_image) {
				errors.lang_image = 'Language image is required';
			}
			return errors;
		},
		onSubmit: async () => {
			console.log(formik.values);
			setIsLoading(true);

			const values: any = formik.values;
			try {
				const formData = new FormData();
				Object.keys(values).forEach((key) => {
					const value = values[key];
					if (value !== null && value !== undefined) {
						if (key == 'lang_image') {
							formData.append(key, 'langimg');
						} else {
							formData.append(key, value);
						}
					}
				});
				// formData.forEach((value, key) => {
				// 	console.log(`${key}:`, value);
				// });
				const response = await axios.post(endpoint, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});

				if (response.data.status == 201) {
					showNotification(
						'Stored Successfully',
						'The Language have been successfully Stored.',
						'success',
					);

					values.lang_name = '';
					values.lang_id = '';
					values.lang_category = '';
					values.lang_image = '';
				} else {
					showNotification(
						'Error in Storing',
						'Error in Storing Datas Please Try Again !',
						'danger',
					);
				}
				console.log('Upload success:', response.data);
				setIsLoading(false);
			} catch (error: any) {
				console.error('Upload error:', error);
				if (error.status == 422) {
					const lang_error = error.response.data.errors;
					console.log(lang_error);
					const errors: any = {};
					Object.keys(values).forEach((key) => {
						if (Object.prototype.hasOwnProperty.call(lang_error, key)) {
							console.log(lang_error[key]);
							errors[key] = lang_error[key][0];
						}
					});
					formik.setErrors(errors);
				} else if (error.status == 500) {
					showNotification(
						'Error in Storing',
						'Error in Storing Datas Please Try Again !',
						'danger',
					);
				}
				setIsLoading(false);
			}
			// setTimeout(handleSave, 2000);
		},
	});
	return (
		<PageWrapper>
			<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
				<h4 className='fw-semibold m-0'>Language</h4>
				{/* <div>
					<Button icon='ControlPoint' color='success' isLight className=''>
						Create
					</Button>
				</div> */}
			</div>

			{/* <Card>
				<CardBody>
					<h4 className='fw-semibold mb-3'>Add Content</h4>
					<div className='row g-4'>
						<div className='col-md-4'>
							<FormGroup id='firstName' label='First Name' isFloating>
								<Input
									className=''
									placeholder='First Name'
									autoComplete='additional-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									isValid={formik.isValid}
									isTouched={formik.touched.firstName}
									invalidFeedback={formik.errors.firstName}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='phone' label='Language Id' isFloating>
								<Input
									className=''
									type='tel'
									placeholder='Language Id'
									autoComplete='tel'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phone}
									isValid={formik.isValid}
									isTouched={formik.touched.phone}
									invalidFeedback={formik.errors.phone}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='phone' label='Course Name' isFloating>
								<Input
									type='tel'
									className=''
									placeholder=' Enter Course Name'
									autoComplete='tel'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phone}
									isValid={formik.isValid}
									isTouched={formik.touched.phone}
									invalidFeedback={formik.errors.phone}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<FormGroup id='exampleSelectOneWay'>
								<Select
									className='py-3'
									ariaLabel='Default select example'
									placeholder='Open this select menu'
									onChange={formikOneWay.handleChange}
									value={formikOneWay.values.exampleSelectOneWay}
									list={SELECT_OPTIONS}
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<FormGroup formText='Image should be in WEBP or PNG or JPEG'>
								<Input type='file' autoComplete='photo' />
							</FormGroup>
						</div>
					</div>
					<div className='d-flex gap-3 align-itms-center justify-content-center mt-3'>
						<Button icon='PublishedWithChanges' color='success' isLight className=''>
							Save
						</Button>
						<Button icon='Cancel' color='danger' isLight className=''>
							Cancel
						</Button>
					</div>
				</CardBody>
			</Card> */}

			<Card>
				<CardBody>
					{/* <h4 className='fw-semibold mb-3'>Add Content</h4> */}
					<form>
						<div className='row g-4'>
							<div className='col-3 col-md-4 col-sm-12'>
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
							<div className='col-3 col-md-4 col-sm-12'>
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

							<div className='col-3 col-md-4 col-sm-12'>
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

							<div className='col-3 col-md-4 col-sm-12'>
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
								isDisable={!formik.isValid && !!formik.submitCount}>
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

			{/* <Card>
				<div className='d-flex justify-content-between mx-4 mb-1 mt-4'>
					<h4 className='fw-semibold m-0'>Language</h4>
					<div>
						<Button icon='ControlPoint' color='success' isLight className=''>
							Create
						</Button>
					</div>
				</div>
				<CardBody className='table-responsive'>
					<table className='table table-modern table-hover'>
						<thead>
							<tr>
								<th scope='col'> Col-1</th>

								<th scope='col'>Image</th>
								<th scope='col'>Name</th>
								<th scope='col'>Sales</th>
								<th scope='col'>Store</th>
								<th scope='col ' className='text-center'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope='row'>1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>Otto</td>
								<td>Otto</td>
								<td className='d-flex gap-2 justify-content-center'>
									{' '}
									<Button color='danger' isLight icon='delete' tag='a' />{' '}
									<Button color='info' isLight icon='Edit' tag='a' />
								</td>
							</tr>
							<tr>
								<th scope='row'>1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>Otto</td>
								<td>Otto</td>
								<td className='d-flex gap-2 justify-content-center'>
									{' '}
									<Button color='danger' isLight icon='delete' tag='a' />{' '}
									<Button color='info' isLight icon='Edit' tag='a' />
								</td>
							</tr>
							<tr>
								<th scope='row'>1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>Otto</td>
								<td>Otto</td>
								<td className='d-flex gap-2 justify-content-center'>
									{' '}
									<Button color='danger' isLight icon='delete' tag='a' />{' '}
									<Button color='info' isLight icon='Edit' tag='a' />
								</td>
							</tr>
							<tr>
								<th scope='row'>1</th>

								<td>Otto</td>
								<td>Otto</td>
								<td>Otto</td>
								<td>Otto</td>
								<td className='d-flex gap-2 justify-content-center'>
									{' '}
									<Button color='danger' isLight icon='delete' tag='a' />{' '}
									<Button color='info' isLight icon='Edit' tag='a' />
								</td>
							</tr>
						</tbody>
					</table>
				</CardBody>
			</Card> */}
		</PageWrapper>
	);
};

export default Index;
