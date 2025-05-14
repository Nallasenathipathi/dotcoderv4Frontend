import React from 'react'
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../../../../components/bootstrap/Card'
import Button from '../../../../components/bootstrap/Button'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import FormGroup from '../../../../components/bootstrap/forms/FormGroup'
import Textarea from '../../../../components/bootstrap/forms/Textarea'
import { useFormik } from 'formik'




const test_case = () => {
  const formik = useFormik({
    initialValues: {
        formPrefix: '',
        formName: '',
        formMiddleName: '',
        formSurName: '',
        formEmailAddress: '',
        formPhone: '',
        formFile: '',
        exampleEvent: '',
    },
    onSubmit: () => {
        // console.log(JSON.stringify(values, null, 2));
    },
});

const formikEvents = useFormik({
    initialValues: {
        exampleEvent: '',
        exampleEventTextarea: '',
    },
    onSubmit: () => {
        // console.log(JSON.stringify(values, null, 2));
    },
});
  return ( 
  <PageWrapper>
    
    <div className='row g-4 mb-4'>
    <div className='col-lg-6 '>
      <FormGroup
										className='col'
										id='exampleSizeTextareaLg'
										label='Test Case'>
										<Textarea  style={{height:'150px',resize:'none',fontSize:'13px'}} size='lg' placeholder='Placeholder' />
	  </FormGroup>
	  </div>
      <div className='col-lg-6 '>
      <FormGroup
										className='col'
										id='exampleSizeTextareaLg'
										label='Result'>
										<Textarea  style={{height:'150px',resize:'none',fontSize:'13px'}} size='lg' placeholder='Placeholder' />
	  </FormGroup>
	  </div>
      
    </div>
    <Button icon='ControlPoint' color='success' isLight className='' style={{width:'fit-content'}}>
								Add
    </Button>
    </PageWrapper>
  )
}

export default test_case
