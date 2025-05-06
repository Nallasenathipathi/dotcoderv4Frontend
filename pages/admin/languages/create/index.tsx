import React from 'react'
import Card, { CardBody, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../../components/bootstrap/Card'
import FormGroup from '../../../../components/bootstrap/forms/FormGroup'
import Input from '../../../../components/bootstrap/forms/Input'
import { useFormik } from 'formik';


function index() {

  const formik = useFormik({
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardLabel icon='Person' iconColor='success'>
            <CardTitle>Personal Information</CardTitle>
            <CardSubTitle>User's credentials</CardSubTitle>
          </CardLabel>
        </CardHeader>
        <CardBody>
          <div className='row g-4'>
            <div className='col-md-6'>
              <FormGroup id='firstName' label='First Name' isFloating>
                <Input
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
            <div className='col-md-6'>
              <FormGroup id='lastName' label='Last Name' isFloating>
                <Input
                  placeholder='Last Name'
                  autoComplete='family-name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  isValid={formik.isValid}
                  isTouched={formik.touched.lastName}
                  invalidFeedback={formik.errors.lastName}
                  validFeedback='Looks good!'
                />
              </FormGroup>
            </div>
            <div className='col-12'>
              <FormGroup
                id='displayName'
                label='Display Name'
                isFloating
                formText='This will be how your name will be displayed in the account section and in reviews'>
                <Input
                  placeholder='Display Name'
                  autoComplete='username'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.displayName}
                  isValid={formik.isValid}
                  isTouched={formik.touched.displayName}
                  invalidFeedback={formik.errors.displayName}
                  validFeedback='Looks good!'
                />
              </FormGroup>
            </div>
          </div>
        </CardBody>
      </Card>

    </>
  )
}

export default index