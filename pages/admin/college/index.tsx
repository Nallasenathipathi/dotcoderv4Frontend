'use client';

import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import axios from 'axios';

interface Colleges {
	id: number;
	collegename: string;
	createdby: string;
	updatedby: string[];
}

async function fetchdata(): Promise<Colleges[]> {
	const response = await axios.get<Colleges[]>('http://127.0.0.1:8000/api/colleges');
	return response.data;
}

const index = () => {

	const [collegeData, setCollegeData] = useState<Colleges[]>([]);

	useEffect(() => {
		
		const getData = async () => {
			try {
				const data = await fetchdata();
				setCollegeData(data);
			} catch (error: any) {
				console.error('Handled error in useEffect:', {
					message: error.message,
					code: error.code,
					status: error.response?.status,
				});
			}
		};
	
		getData();
	}, []);
	

	return (
		<>
			<Card className='w-100'>
				<div className='d-flex justify-content-between mx-4 mb-1 mt-4'>
					<h4 className='fw-semibold m-0'>Colleges</h4>
					<div>
						<Button icon='ControlPoint' color='success' isLight className=''>
							Create
						</Button>
					</div>
				</div>
				<CardBody className='table-responsive'>
					<table className='table table-modern table-hover'>
						<thead>
							<tr>
								<th scope='col'> #</th>

								<th scope='col'>Colleges</th>
								<th scope='col'>Created by</th>
								<th scope='col'>Updated by</th>
								{/* <th scope='col'>Store</th> */}
								<th scope='col ' className='text-center'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope='row'>1</th>
								<td>Mark</td>
								<td>Otto</td>
								{/* <td>Otto</td> */}
								<td>Otto</td>
								<td className='d-flex gap-2 justify-content-center'>
									{' '}
									<Button color='danger' isLight icon='delete' tag='a' />{' '}
									<Button color='info' isLight icon='Edit' tag='a' />
								</td>
							</tr>
						</tbody>
					</table>
				</CardBody>
			</Card>
		</>
	);
};

export default index;
