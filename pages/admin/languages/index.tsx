import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import LanguageCategories from '../../../common/data/commonDatas';
import showNotification from '../../../components/extras/showNotification';
import Link from 'next/link';
import { fetchData ,deleteData } from '../../../common/validations/validations';


const Index: React.FC = () => {
	const SELECT_OPTIONS = LanguageCategories;
	const endpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages`;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [language_datas, setLanguage_datas] = useState<any[]>([]);

	const deleteLanguage = async (delete_lang_id: number) => {
		console.log('delete_lang_id:', delete_lang_id);
		let deleteEndpoint = `${process.env.NEXT_PUBLIC_API_END_POINT}/languages/${delete_lang_id}`
		try {
			const data = await deleteData(deleteEndpoint);
			if (data?.status === 200) {
				showNotification('Deleted', 'Language Deleted Successfully !', 'success');
			} else {
				showNotification('Error', 'Failed to Delete languages', 'danger');
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
				setLanguage_datas(data.data);
				fetchinitialData();
			} else {
				showNotification('Error', 'Failed to fetch languages', 'danger');
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
								{language_datas.length <= 0 ? (
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
												<Link href={`/admin/languages/update/${item.id}`}>
													<Button color='info' isLight icon='Edit' />
												</Link>
												<Button onClick={() => {
													deleteLanguage(item.id)
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
