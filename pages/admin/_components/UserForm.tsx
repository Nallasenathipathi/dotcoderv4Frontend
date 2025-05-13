import React, { useState, useEffect } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import { GenderCategories } from '../../../common/data/commonDatas'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { submitUserData, fetchData } from '../../../common/submissions/submissions'

type FormProp = {
    title: string
    isEdit: boolean
    apiEndpoint: string
    frontEndRoute: string
    role: number
    validator: (values: any, isEdit: number, role: number) => void
}

const UserForm = ({ isEdit, apiEndpoint, frontEndRoute, validator, title, role }: FormProp) => {

    let endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/${apiEndpoint}`;
    let id: any;
    let profile_path = "";
    let college_options: { value: number, text: string }[] = []

    const GENDER_SELECT_OPTIONS = GenderCategories

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
            name: "",
            email: "",
            password: "",
            dob: "",
            gender: "",
            contact_number: "",
            profile: "",
            old_profile: "",
            college_id: ""
        },
        validate: (values) => {
            const errors = validator(values, isEdit ? 1 : 0, role);
            return errors;
        },
        onSubmit: async () => {
            console.log(formik.values);
            setIsLoading(true);
            const values: any = formik.values;
            try {
                const data = await submitUserData(values, endpoint, isEdit?1:0, role);
                console.log(data);

                if (data.status == 200) {
                    showNotification(
                        `${isEdit ? "Updated " : "Stored"} Successfully`,
                        `The ${title} have been successfully ${isEdit ? "Updated " : "Stored"}.`,
                        'success',
                    );
                    values.name = '';
                    values.email = '';
                    values.password = '';
                    values.dob = '';
                    values.gender = '';
                    values.contact_number = ''
                    values.profile = ''
                    values.old_profile = '',
                        values.college_id = ''

                    router.push(`/admin/${frontEndRoute}`);
                } else {
                    showNotification(
                        'Error in Updated',
                        'Error in Updated Datas Please Try Again !',
                        'danger',
                    );
                }
                console.log('Upload success:', data);
            } catch (error: any) {
                console.log(error);

                if (error.response?.status === 422) {
                    const user_error = error.response.data.errors;
                    const errors: any = {};

                    Object.keys(values).forEach((key) => {
                        if (Object.prototype.hasOwnProperty.call(user_error, key)) {
                            errors[key] = user_error[key][0];
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
                        'Error while Updated data. Please try again later.',
                        'danger',
                    );
                }
            } finally {
                setIsLoading(false);
            }
        },
    });


    const fetchCollegeData = async () => {
        try {
            let endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/colleges`
            const data = await fetchData(endpoint)
            college_options = data.data?.map((college: any) => {
                return { value: college?.id, text: college?.college_name }
            })
        } catch (error: any) {
            if (error?.status === 401) {
                showNotification('Session Expired', 'Please login again', 'danger');
            } else {
                showNotification('Network Error', 'Could not connect to the server Please Try Again!', 'danger');
            }
        }
    }

    const fetchinitialData = async () => {
        try {
            setIsFetching(true)
            const data = await fetchData(endpoint);
            console.log(data);
            setIsLoading(true)
            if (data?.status === 200) {
                formik.setValues({
                    name: data.data.name || '',
                    email: data.data.email || '',
                    password: data.data.password || '',
                    dob: data.data.dob || '',
                    gender: data.data.gender || '',
                    contact_number: data.data.contact_number || '',
                    profile: '',
                    old_profile: data.data.profile || '',
                    college_id: (role !== 3 ? data.data.college_id || '' : '')
                });
                profile_path = data.data.profile || ''
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
        fetchCollegeData()
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
                                        <FormGroup id='name' label="Name" isFloating>
                                            <Input
                                                placeholder="Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.name}
                                                invalidFeedback={formik.errors.name}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup id='email' label="Email" isFloating>
                                            <Input
                                                type='email'
                                                placeholder="Email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.email}
                                                invalidFeedback={formik.errors.email}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup id='password' label="Password" isFloating>
                                            <Input
                                                type='password'
                                                placeholder="Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.password}
                                                invalidFeedback={formik.errors.password}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup id='dob' label="Date of Birth" isFloating>
                                            <Input
                                                type='date'
                                                placeholder="Date of Birth"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.dob}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.dob}
                                                invalidFeedback={formik.errors.dob}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup id='gender' label='Gender' isFloating>
                                            <Select
                                                ariaLabel='Default select example'
                                                placeholder='Open this select menu'
                                                onChange={formik.handleChange}
                                                value={formik.values.gender}
                                                onBlur={formik.handleBlur}
                                                list={GENDER_SELECT_OPTIONS}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.gender}
                                                invalidFeedback={formik.errors.gender}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup id='contact_number' label="Contact Number" isFloating>
                                            <Input
                                                type='text'
                                                placeholder="Contact Number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contact_number}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.contact_number}
                                                invalidFeedback={formik.errors.contact_number}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-12 col-md-4 col-lg-3'>
                                        <FormGroup
                                            id='profile'
                                            isFloating
                                            formText='Image should be in WEBP or PNG or JPEG'
                                            label='Upload the image'>
                                            <Input
                                                type='file'
                                                onChange={(event: any) => {
                                                    const file = event.currentTarget.files?.[0];
                                                    if (file) {
                                                        formik.setFieldValue('profile', file);
                                                    } else {
                                                        formik.setFieldValue('profile', ''); // or '' depending on your initial value
                                                    }
                                                }}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.profile}
                                                invalidFeedback={formik.errors.profile}
                                            />
                                            {
                                                isEdit && profile_path ?
                                                    <img
                                                        src={profile_path}
                                                        width='30%'
                                                        alt='Image not available Please Upload again!'
                                                    /> :
                                                    <></>
                                            }
                                        </FormGroup>
                                    </div>
                                    {
                                        role !== 3 && (
                                            <div className='col-12 col-md-4 col-lg-3'>
                                                <FormGroup id='college_id' label='College' isFloating>
                                                    <Select
                                                        ariaLabel='Default select example'
                                                        placeholder='Open this select menu'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.college_id}
                                                        onBlur={formik.handleBlur}
                                                        list={college_options}
                                                        isValid={formik.isValid}
                                                        isTouched={formik.touched.college_id}
                                                        invalidFeedback={formik.errors.college_id}
                                                    />
                                                </FormGroup>
                                            </div>
                                        )
                                    }
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
                                    <Link href={`/admin/${frontEndRoute}`}>
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

export default UserForm;
