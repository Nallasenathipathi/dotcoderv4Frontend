import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';
import { fetchData ,deleteData } from '../../../common/submissions/submissions';


const Index: React.FC = () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/sections`;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sectionsData, setSectionsData] = useState<any[]>([]);

    const deleteSection = async (delete_section_id: number) => {
        console.log('delete_section_id:', delete_section_id);
        let deleteEndpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/sections/${delete_section_id}`
        try {
            const data = await deleteData(deleteEndpoint);
            if (data?.status === 200) {
                showNotification('Deleted', 'Section Deleted Successfully !', 'success');
                await fetchinitialData();
            } else {
                showNotification('Error', 'Failed to Delete section', 'danger');
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
                setSectionsData(data.data);
            } else {
                showNotification('Error', 'Failed to fetch sections', 'danger');
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
                <h4 className='fw-semibold m-0'>Sections</h4>
                <div>
                    <Link href='/admin/sections/create'>
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
                                    <th scope='col'>Section Name</th>
                                    <th scope='col'>Created By</th>
                                    <th scope='col'>Updated By</th>
                                    <th scope='col ' className='text-center'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sectionsData.length <= 0 ? (
                                    <tr>
                                        <td>No Datas Found</td>
                                    </tr>
                                ) : (
                                    sectionsData.map((item: any, index: any) => (
                                        <tr key={item.id || index}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{item.section_name}</td>
                                            <td>{item.created_by}</td>
                                            <td>{item.updated_by}</td>
                                            <td className='d-flex gap-2 justify-content-center'>
                                                <Link href={`/admin/sections/update/${item.id}`}>
                                                    <Button color='info' isLight icon='Edit' />
                                                </Link>
                                                <Button onClick={() => {
                                                    deleteSection(item.id)
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
