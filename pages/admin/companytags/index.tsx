import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';
import { fetchData ,deleteData } from '../../../common/submissions/submissions';


const Index: React.FC = () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/companytags`;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [companyTagsData, setCompanyTagsData] = useState<any[]>([]);

    const deleteCompanyTag = async (delete_tag_id: number) => {
        console.log('delete_tag_id:', delete_tag_id);
        let deleteEndpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/companytags/${delete_tag_id}`
        try {
            const data = await deleteData(deleteEndpoint);
            if (data?.status === 200) {
                showNotification('Deleted', 'Company Tag Deleted Successfully !', 'success');
            } else {
                showNotification('Error', 'Failed to Delete company tag', 'danger');
            }
        } catch (error: any) {
            console.log('error:', error);
            if (error?.status === 401) {
                showNotification('Session Expired', 'Please login again', 'danger');
            }else {
                showNotification('Network Error', 'Could not connect to the server Please Try Again!', 'danger');
            }
        } 
    }

    const fetchinitialData = async () => {
        try {
            const data = await fetchData(endpoint);
            if (data?.status === 200) {
                setCompanyTagsData(data.data);
            } else {
                showNotification('Error', 'Failed to fetch company tags', 'danger');
            }
        } catch (error: any) {
            console.log('error:', error);
            if (error?.status === 401) {
                showNotification('Session Expired', 'Please login again', 'danger');
            } else {
                showNotification('Network Error', 'Could not connect to the server Please Try Again!', 'danger');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchinitialData();
    }, []);

    return (
        <PageWrapper>
            <div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
                <h4 className='fw-semibold m-0'>Company Tags</h4>
                <div>
                    <Link href='/admin/companytags/create'>
                        <Button icon='ControlPoint' color='success' isLight className=''>
                            Create
                        </Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardBody className='table-responsive'>
                    {!isLoading ? (
                        <table className='table table-modern table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'> SL.NO</th>
                                    <th scope='col'>Tag Name</th>
                                    <th scope='col'>Created By</th>
                                    <th scope='col'>Updated By</th>
                                    <th scope='col ' className='text-center'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyTagsData.length <= 0 ? (
                                    <tr>
                                        <td>No Datas Found</td>
                                    </tr>
                                ) : (
                                    companyTagsData.map((item: any, index: any) => (
                                        <tr key={item.id || index}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{item.tag_name}</td>
                                            <td>{item.created_by}</td>
                                            <td>{item.updated_by}</td>
                                            <td className='d-flex gap-2 justify-content-center'>
                                                <Link href={`/admin/companytags/update/${item.id}`}>
                                                    <Button color='info' isLight icon='Edit' />
                                                </Link>
                                                <Button onClick={() => {
                                                    deleteCompanyTag(item.id)
                                                }} color='danger' isLight icon='delete' />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div>Loading Datas</div>
                    )}
                </CardBody>
            </Card>
        </PageWrapper>
    );
};

export default Index;
