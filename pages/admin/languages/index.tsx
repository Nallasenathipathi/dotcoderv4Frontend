import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import LanguageCategories from '../../../common/data/commonDatas';
import axios from 'axios';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';

const Index: React.FC = () => {
	const SELECT_OPTIONS = LanguageCategories;
	console.log(SELECT_OPTIONS);

	const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages`;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [language_datas, setLanguage_datas] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(endpoint, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});

				console.log(response.data.data);
				if (response.data.status == 200) {
					setLanguage_datas(response.data.data);
				} else {
					showNotification(
						'Error in Fetching Languages',
						'Error in Fetching Languages Please Try Again !',
						'danger',
					);
				}
				console.log('Upload success:', response.data);
				setIsLoading(false);
			} catch (error: any) {
				console.error('Upload error:', error);
				showNotification(
					'Error in Fetching Languages',
					'Error in Fetching Languages Please Try Again !',
					'danger',
				);
				setIsLoading(false);
			}
		};

		fetchData();
		// console.log('language_datas:', language_datas);
	}, [endpoint]);

	return (
		<PageWrapper>
			<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
				<h4 className='fw-semibold m-0'>Language</h4>
				<div>
					<Link href='/admin/languages/create'>
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
									<th scope='col'>Language</th>
									<th scope='col'>Language-Id</th>
									<th scope='col'>Category</th>
									<th scope='col'>Created By</th>
									<th scope='col'>Updated By</th>
									<th scope='col ' className='text-center'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{!language_datas ? (
									<tr>
										<td>No Datas Found</td>
									</tr>
								) : (
									language_datas.map((item: any, index: any) => (
										<tr key={item.id || index}>
											<th scope='row'>{index + 1}</th>
											<td>{item.lang_name}</td>
											<td>{item.lang_id}</td>
											<td>
												{SELECT_OPTIONS.find(
													(cat) => cat.value === item.lang_category,
												)?.text || 'Unknown'}
											</td>
											<td>{item.created_by}</td>
											<td>{item.updated_by}</td>
											<td className='d-flex gap-2 justify-content-center'>
												<Button color='info' isLight icon='Edit' tag='a' />
												<Button
													color='danger'
													isLight
													icon='delete'
													tag='a'
												/>
											</td>
										</tr>
									))

									// <tr>
									// 	<th scope='row'>1</th>
									// 	<td>Mark</td>
									// 	<td>Otto</td>
									// 	<td>Otto</td>
									// 	<td>Otto</td>
									// 	<td>Otto</td>
									// 	<td className='d-flex gap-2 justify-content-center'>
									// 		{/* {' '} */}
									// 		<Button color='danger' isLight icon='delete' tag='a' />
									// 		{/* {' '} */}
									// 		<Button color='info' isLight icon='Edit' tag='a' />
									// 	</td>
									// </tr>
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
