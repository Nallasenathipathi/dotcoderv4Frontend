import React, { useState, useEffect } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { submitCommonData, fetchData } from '../../../common/submissions/submissions'

type FormProp = {
    title:string
    isEdit: boolean
    apiEndpoint:string // frontend and backend routes should be same
    fieldName:string
    label:string
    validator:(values:any,isEdit:number)=>void
}

const CommonForm = ({ isEdit,apiEndpoint,fieldName,validator,title,label }: FormProp) => {

    let endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/${apiEndpoint}`;
    let id: any;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { slug } = router.query;

    if (slug && Array.isArray(slug)) {
        id = slug[slug.length - 1];
        endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/${apiEndpoint}/${id}`;
    }

    const formik = useFormik({
        initialValues: {
            [fieldName]: '',
        },
        validate: (values) => {
            const errors = validator(values, isEdit ? 1 : 0);
            return errors;
        },
        onSubmit: async () => {
            console.log(formik.values);
            setIsLoading(true);
            const values: any = formik.values;
            try {
                const data = await submitCommonData(values, endpoint, isEdit ? 1 : 0);

                if (data.status == 201 || data.status == 200) {
                    showNotification(
                        `${isEdit ? "Updated " : "Stored"} Successfully`,
                        `The ${title} have been successfully ${isEdit ? "Updated " : "Stored"}.`,
                        'success',
                    );
                    values[fieldName] = '';
                    router.push(`/admin/${apiEndpoint}`);
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
                    const page_error = error.response.data.errors;
                    const errors: any = {};

                    Object.keys(values).forEach((key) => {
                        if (Object.prototype.hasOwnProperty.call(page_error, key)) {
                            errors[key] = page_error[key][0];
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

    const fetchinitialData = async () => {
        try {
            setIsFetching(true)
            const data = await fetchData(endpoint);
            console.log(data);
            setIsLoading(true)
            if (data?.status === 200) {
                formik.setValues({
                    [fieldName]: data.data[fieldName] || '',
                });
                setIsLoading(false);
            } else {
                showNotification('Error', `Failed to fetch ${title.toLowerCase()}`, 'danger');
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
        if (isEdit)
            fetchinitialData();
    }, []);

    return (
        <PageWrapper>
            <div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
                <h4 className='fw-semibold m-0'>{title}</h4>
            </div>
            <Card>
                <CardBody>
                    {
                        !isFetching ? (
                            <form>
                                <div className='row g-4'>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup id={`${fieldName}`} label={`${label}`} isFloating>
                                            <Input
                                                placeholder={`${label}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values[fieldName]}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched[fieldName]}
                                                invalidFeedback={formik.errors[fieldName]}
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
                                    <Link href={`/admin/${apiEndpoint}`}>
                                        <Button icon='Cancel' color='danger' isLight className=''>
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        ) : (
                            <div>Fetching datas</div>
                        )
                    }
                </CardBody>
            </Card>
        </PageWrapper>
    );
};

export default CommonForm;
