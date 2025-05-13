'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';
import { fetchData, deleteData } from '../../../common/submissions/submissions';
import { useRouter } from 'next/router';


interface Colleges {
	id: number;
	college_name: string;
	created_by: string;
	updated_by: string[];
}

const index = () => {
	const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/colleges`;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [collegeData, setCollegeData] = useState<Colleges[]>([]);

	const router = useRouter();

	function handleNavigateToCreate() {
		router.push('/admin/college/create');
	}

	console.log(collegeData);

	const deleteCollege = async (delete_college_id: number) => {
		console.log('delete_college_id:', delete_college_id);
		let deleteEndpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/colleges/${delete_college_id}`
		try {
			const data = await deleteData(deleteEndpoint);
			if (data?.status === 200) {
				showNotification('Deleted', 'College Deleted Successfully !', 'success');
			} else {
				showNotification('Error', 'Failed to Delete colleges', 'danger');
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

	const getData = async () => {
		try {
			const data = await fetchData(endpoint);
			if (data?.status === 200) {
				setCollegeData(data.data);
			} else {
				showNotification('Error', 'Failed to fetch colleges', 'danger');
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
		getData();
	}, []);

	return (
		<PageWrapper>
			<Card className='w-100'>
				<div className='d-flex justify-content-between mx-4 mb-1 mt-4'>
					<h4 className='fw-semibold m-0'>Colleges</h4>
					<div>
						<Button
							icon='ControlPoint'
							color='success'
							isLight
							className=''
							onClick={handleNavigateToCreate}>
							Create
						</Button>
					</div>
				</div>
				<CardBody className='table-responsive'>
					{
						!isLoading ? (
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th scope='col'> #</th>
										<th scope='col'>Colleges</th>
										<th scope='col'>Created by</th>
										<th scope='col'>Updated by</th>
										<th scope='col ' className='text-center'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{collegeData.length ? (
										collegeData.map((data, index) => (
											<tr key={data.id}>
												<th scope='row'>{index + 1}</th>
												<td>{data.college_name}</td>
												<td>{data.created_by}</td>
												<td>{data.updated_by.join(', ')}</td>
												<td className='d-flex gap-2 justify-content-center'>
													<Link href={`/admin/college/update/${data.id}`}>
														<Button color='info' isLight icon='Edit' />
													</Link>
													<Button onClick={() => {
														deleteCollege(data.id)
													}} color='danger' isLight icon='delete' />
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={5} className='text-center text-muted py-4 fs-5'>
												No datas
											</td>
										</tr>
									)}
								</tbody>
							</table>
						) :
							(
								<div>Loading Datas</div>
							)
					}
				</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default index;
