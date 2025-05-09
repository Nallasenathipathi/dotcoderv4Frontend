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
			<Card>
				<CardBody>
					<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
						<h4 className='fw-semibold m-0'>Language</h4>
						<div>
							<Button icon='ControlPoint' color='success' isLight className=''>
								Create
							</Button>
						</div>
					</div>
					<div className='row g-4'>
						<div className='col-md-4'>
							<FormGroup id='firstName' label='Question Title' isFloating>
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
						<div className='col-md-4'>
							<FormGroup id='url' label='url' isFloating>
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
							<div className='csm_form position-relative'>
								<div className='csm_label position-absolute top-1 start-2'>
									Select Level
								</div>
								<FormGroup id='exampleSelectOneWay'>
									<Select
										className='pt-4'
										ariaLabel='Default select example'
										placeholder='Select Level'
										onChange={formikOneWay.handleChange}
										value={formikOneWay.values.exampleSelectOneWay}
										list={SELECT_OPTIONS}
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-4'>
							<div className='csm_form position-relative'>
								<div className='csm_label position-absolute top-1 start-2'>
									Languages
								</div>
								<FormGroup id='exampleSelectOneWay'>
									<Select
										className='pt-4'
										ariaLabel='Default select example'
										placeholder='Select Languages'
										onChange={formikOneWay.handleChange}
										value={formikOneWay.values.exampleSelectOneWay}
										list={SELECT_OPTIONS}
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-md-4'>
							<FormGroup id='Mark' label='Mark' isFloating>
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
						<div className='col-md-4'>
							<FormGroup id='url' label='Actual Solving Time' isFloating>
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
							<div className='csm_form position-relative'>
								<div className='csm_label position-absolute top-1 start-2'>
									Select from down
								</div>
								<FormGroup id='exampleSelectOneWay'>
									<Select
										className='pt-4'
										ariaLabel='Default select example'
										placeholder='Open this select menu'
										onChange={formikOneWay.handleChange}
										value={formikOneWay.values.exampleSelectOneWay}
										list={SELECT_OPTIONS}
									/>
								</FormGroup>
							</div>
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
					<h4 className='fw-semibold m-0'>Quill Editor</h4>
				</div>
				<CardBody className='table-responsive'>quil</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default Index;
