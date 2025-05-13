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
import { Topic_validation } from '../../../../common/validations/validations';
import {submitCommonData} from '../../../../common/submissions/submissions'

const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/qbtopics`;

const index = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            course_id: '',
            topic_tag_id: '',
            topic_name:''
        },
        validate: (values) => {
            const errors = Topic_validation(values, 0);
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
                        'The Topic have been successfully Stored.',
                        'success',
                    );
                    values.course_id = '';
                    values.topic_tag_id = '';
                    values.topic_name = '';
                    router.push('/admin/qbtopics');
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
                    const topic_error = error.response.data.errors;
                    const errors: any = {};

                    Object.keys(values).forEach((key) => {
                        if (Object.prototype.hasOwnProperty.call(topic_error, key)) {
                            errors[key] = topic_error[key][0];
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
                <h4 className='fw-semibold m-0'>Topics</h4>
            </div>
            <Card>
                <CardBody>
                    <form>
                        <div className='row g-4'>
                            <div className='col-12 col-md-4 col-lg-3'>
                                <FormGroup id='course_id' label='Course Id' isFloating>
                                    <Input
                                        type='number'
                                        min={1}
                                        placeholder='Course Id'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course_id}
                                        isValid={formik.isValid}
                                        isTouched={formik.touched.course_id}
                                        invalidFeedback={formik.errors.course_id}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-12 col-md-4 col-lg-3'>
                                <FormGroup id='topic_tag_id' label='Topic Tag Id' isFloating>
                                    <Input
                                        type='number'
                                        min={1}
                                        placeholder='Topic Tag Id'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.topic_tag_id}
                                        isValid={formik.isValid}
                                        isTouched={formik.touched.topic_tag_id}
                                        invalidFeedback={formik.errors.topic_tag_id}
                                    // validFeedback='Looks good!'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-12 col-md-4 col-lg-3'>
                                <FormGroup id='topic_name' label='Topic Name' isFloating>
                                    <Input
                                        placeholder='Topic Name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.topic_name}
                                        isValid={formik.isValid}
                                        isTouched={formik.touched.topic_name}
                                        invalidFeedback={formik.errors.topic_name}
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
                            <Link href='/admin/qbtopics'>
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
