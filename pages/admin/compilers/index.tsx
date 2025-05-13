import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import axios from 'axios';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';
import { fetchData, deleteData } from '../../../common/submissions/submissions';

const Index: React.FC = () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/compilers`;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [compiler_datas, setCompiler_datas] = useState<any[]>([]);


    const fetchinitialData = async () => {
        try {
            const data = await fetchData(endpoint);
            if (data?.status === 200) {
                setCompiler_datas(data.data);
            } else {
                showNotification('Error', 'Failed to fetch compiler', 'danger');
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

    const deleteCompiler = async (delete_compiler_id: number) => {
        console.log('delete_compiler_id:', delete_compiler_id);
        let deleteEndpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/compilers/${delete_compiler_id}`
        try {
            const data = await deleteData(deleteEndpoint);
            if (data?.status === 200) {
                showNotification('Deleted', 'Compiler Deleted Successfully !', 'success');
                await fetchinitialData();
            } else {
                showNotification('Error', 'Failed to Delete Compilers', 'danger');
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

    return (
        <PageWrapper>
            <div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
                <h4 className='fw-semibold m-0'>Compiler</h4>
                <div>
                    <Link href='/admin/compilers/create'>
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
                                    <th scope='col'>Api</th>
                                    <th scope='col'>Created By</th>
                                    <th scope='col'>Updated By</th>
                                    <th scope='col ' className='text-center'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {compiler_datas.length <= 0 ? (
                                    <tr>
                                        <td>No Datas Found</td>
                                    </tr>
                                ) : (
                                    compiler_datas.map((item: any, index: any) => {
                                        console.log('Compiler ID:', compiler_datas); // 👈 Add this line
                                        console.log('Item ID:', item.id); // 👈 Add this line

                                        return (
                                            <tr key={item.id || index}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{item.api}</td>
                                                <td>{item.created_by}</td>
                                                <td>{item.updated_by}</td>
                                                <td className='d-flex gap-2 justify-content-center'>
                                                    <Link href={`/admin/compilers/update/${item.id}`}>
                                                        <Button color="info" isLight icon="Edit" />
                                                    </Link>
                                                    <Button onClick={() => {
                                                        deleteCompiler(item.id)
                                                    }} color='danger' isLight icon='delete' />
                                                </td>
                                            </tr>
                                        );
                                    })
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
