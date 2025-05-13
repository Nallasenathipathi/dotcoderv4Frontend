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
import { Department_validation } from '../../../../common/validations/validations';
import {submitCommonData} from '../../../../common/submissions/submissions'

const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/departments`;

const index = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            department_name: '',
            department_short_name: '',
        },
        validate: (values) => {
            const errors = Department_validation(values, 0);
            return errors;
        },
        onSubmit: async () => {
            console.log(formik.values);
            setIsLoading(true);
            const values: any = formik.values;
            try {
                const data = await submitCommonData(values, endpoint, 0);

                if (data.status == 201) {
                    showNotification(
                        'Stored Successfully',
                        'The Department have been successfully Stored.',
                        'success',
                    );
                    values.department_name = '';
                    values.department_short_name = '';
                    router.push('/admin/departments');
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
                    const dept_error = error.response.data.errors;
                    const errors: any = {};

                    Object.keys(values).forEach((key) => {
                        if (Object.prototype.hasOwnProperty.call(dept_error, key)) {
                            errors[key] = dept_error[key][0];
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
                <h4 className='fw-semibold m-0'>Department</h4>
            </div>
            <Card>
                <CardBody>
                    <form>
                        <div className='row g-4'>
                            <div className='col-12 col-md-4 col-lg-3'>
                                <FormGroup id='department_name' label='Department name' isFloating>
                                    <Input
                                        placeholder='Department name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.department_name}
                                        isValid={formik.isValid}
                                        isTouched={formik.touched.department_name}
                                        invalidFeedback={formik.errors.department_name}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-12 col-md-4 col-lg-3'>
                                <FormGroup id='department_short_name' label='Department short name' isFloating>
                                    <Input
                                        type='text'
                                        placeholder='Department short name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.department_short_name}
                                        isValid={formik.isValid}
                                        isTouched={formik.touched.department_short_name}
                                        invalidFeedback={formik.errors.department_short_name}
                                    // validFeedback='Looks good!'
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
                            <Link href='/admin/departments'>
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
