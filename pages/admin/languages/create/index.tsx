import React from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
// import useDarkMode from '../../../../hooks/useDarkMode';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Select from '../../../../components/bootstrap/forms/Select';
import Button from '../../../../components/bootstrap/Button';

const Index: React.FC = () => {
	const SELECT_OPTIONS = [
		{ value: 1, text: 'One' },
		{ value: 2, text: 'Two' },
		{ value: 3, text: 'Three' },
		{ value: 4, text: 'Four' },
		{ value: 5, text: 'Five' },
		{ value: 6, text: 'Six' },
	];
	const formikOneWay = useFormik({
		initialValues: {
			exampleSelectOneWay: '',
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			displayName: 'johndoe',
			emailAddress: 'johndoe@site.com',
			phone: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			checkOne: true,
			checkTwo: false,
			checkThree: true,
		},
		onSubmit: () => {
			// setIsLoading(true);
			// setTimeout(handleSave, 2000);
		},
	});
	// const { darkModeStatus } = useDarkMode();
	return (
		<PageWrapper>
			<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
				<h4 className='fw-semibold m-0'>Language</h4>
				<div>
					<Button icon='ControlPoint' color='success' isLight className=''>
						Create
					</Button>
				</div>
			</div>

			<Card>
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
			</Card>

			<Card>
				<CardBody>
					<h4 className='fw-semibold mb-3'>Add Content</h4>
					<div className='row g-4'>
						<div className='col-md-4'>
							<FormGroup id='firstName' label='First Name'>
								<Input
									className='py-3'
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
							<FormGroup id='phone' label='Language Id'>
								<Input
									className='py-3'
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
							<FormGroup id='phone' label='Course Name'>
								<Input
									type='tel'
									className='py-3'
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
							<FormGroup id='exampleSelectOneWay' label='Please select'>
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
							<FormGroup
								formText='Image should be in WEBP or PNG or JPEG'
								label='Please select'>
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
			</Card>

			<Card>
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
			</Card>
		</PageWrapper>
	);
};

export default Index;
