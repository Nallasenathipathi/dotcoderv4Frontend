import React, { useState } from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import useDarkMode from '../../../../hooks/useDarkMode';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Select from '../../../../components/bootstrap/forms/Select';
import Button from '../../../../components/bootstrap/Button';
import { IServiceProps } from '../../../../common/data/serviceDummyData';
// import useDarkMode from '../../../../hooks/useDarkMode';
import classNames from 'classnames';
const USER_APPOINTMENT: IUserAppointment = {
	APPROVED: 'Approved',
	PENDING: 'Pending',
	CANCELED: 'Canceled',
};

interface ClassNames {
	(...args: classNames.ArgumentArray): string;

	default: ClassNames;
}
const surfing: IServiceProps = {
	name: 'Surfing',
	icon: 'Surfing',
	color: 'info',
};
const kiteSurfing: IServiceProps = {
	name: 'Kite Surfing',
	icon: 'Kitesurfing',
	color: 'danger',
};
const tennis: IServiceProps = {
	name: 'Tennis',
	icon: 'SportsTennis',
	color: 'success',
};
const kayaking: IServiceProps = {
	name: 'Kayaking',
	icon: 'Kayaking',
	color: 'info',
};
const handball: IServiceProps = {
	name: 'Handball',
	icon: 'SportsHandball',
	color: 'warning',
};
const iceSkating: IServiceProps = {
	name: 'Ice Skating',
	icon: 'IceSkating',
	color: 'info',
};
const snowboarding: IServiceProps = {
	name: 'Snowboarding',
	icon: 'Snowboarding',
	color: 'warning',
};
const volleyball: IServiceProps = {
	name: 'Volleyball',
	icon: 'SportsVolleyball',
	color: 'warning',
};
const cricket: IServiceProps = {
	name: 'Cricket',
	icon: 'SportsCricket',
	color: 'success',
};
const yoga: IServiceProps = {
	name: 'Yoga',
	icon: 'SelfImprovement',
	color: 'success',
};
const hiking: IServiceProps = {
	name: 'Hiking',
	icon: 'Hiking',
	color: 'danger',
};
const football: IServiceProps = {
	name: 'Football',
	icon: 'SportsFootball',
	color: 'success',
};

const SERVICES: { [key: string]: IServiceProps } = {
	SURFING: surfing,
	KITE_SURFING: kiteSurfing,
	TENNIS: tennis,
	KAYAKING: kayaking,
	HANDBALL: handball,
	ICE_SKATING: iceSkating,
	SNOWBOARDING: snowboarding,
	VOLLEYBALL: volleyball,
	CRICKET: cricket,
	YOGA: yoga,
	HIKING: hiking,
	FOOTBALL: football,
};






const dataJohnAppointments = [
	{
		id: 1,
		time: '1h 30m',
		person: 2,
		...SERVICES.KAYAKING,
		status: USER_APPOINTMENT.APPROVED,
	},
	{
		id: 2,
		time: '1h 30m',
		person: 2,
		...SERVICES.TENNIS,
		status: USER_APPOINTMENT.APPROVED,
	},
	{
		id: 3,
		time: '45m',
		person: 1,
		...SERVICES.SURFING,
		status: USER_APPOINTMENT.APPROVED,
	},
	{
		id: 4,
		time: '1h',
		person: 1,
		...SERVICES.HANDBALL,
		status: USER_APPOINTMENT.PENDING,
	},
	{
		id: 5,
		time: '1h',
		person: 4,
		...SERVICES.FOOTBALL,
		status: USER_APPOINTMENT.PENDING,
	},
	{
		id: 6,
		time: '2h',
		person: 1,
		...SERVICES.KITE_SURFING,
		status: USER_APPOINTMENT.PENDING,
	},
	{
		id: 7,
		time: '30m',
		person: 1,
		...SERVICES.YOGA,
		status: USER_APPOINTMENT.PENDING,
	},
	{
		id: 8,
		time: '1h',
		person: 1,
		...SERVICES.ICE_SKATING,
		status: USER_APPOINTMENT.PENDING,
	},
	{
		id: 9,
		time: '1h',
		person: 1,
		...SERVICES.SURFING,
		status: USER_APPOINTMENT.CANCELED,
	},
];
interface IUserAppointment {
	[key: string]: 'Approved' | 'Pending' | 'Canceled';
}

const Index: React.FC = () => {

	const { themeStatus, darkModeStatus } = useDarkMode();
	const [activeUserAppointmentTab, setActiveUserAppointmentTab] = useState<
		IUserAppointment['key']
	>(USER_APPOINTMENT.APPROVED);
	const handleActiveUserAppointmentTab = (tabName: IUserAppointment['key']) => {
		setActiveUserAppointmentTab(tabName);
	};
	
	const SELECT_OPTIONS = [
		{ value: 1, text: 'One' },
		{ value: 2, text: 'Two' },
		{ value: 3, text: 'Three' },
		{ value: 4, text: 'Four' },
		{ value: 5, text: 'Five' },
		{ value: 6, text: 'Six' },
	];
	const formikOneWay = useFormik({
		initialValues: {
			exampleSelectOneWay: '',
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			displayName: 'johndoe',
			emailAddress: 'johndoe@site.com',
			phone: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			checkOne: true,
			checkTwo: false,
			checkThree: true,
		},
		onSubmit: () => {
			// setIsLoading(true);
			// setTimeout(handleSave, 2000);
		},
	});
	// const { darkModeStatus } = useDarkMode();
	return (
		<PageWrapper>
			<Card>
				<CardBody>
					<div className='d-flex justify-content-between mx-3 mb-4 mt-2'>
						<h4 className='fw-semibold m-0'>Language</h4>
						<div>
							<Button icon='ControlPoint' color='success' isLight className=''>
								Create
							</Button>
						</div>
					</div>
					<div className='row g-4'>
						<div className='col-md-4'>
							<FormGroup id='firstName' label='Question Title' isFloating>
								<Input
									className=''
									placeholder='First Name'
									autoComplete='additional-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									isValid={formik.isValid}
									isTouched={formik.touched.firstName}
									invalidFeedback={formik.errors.firstName}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='url' label='url' isFloating>
								<Input
									className=''
									placeholder='First Name'
									autoComplete='additional-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									isValid={formik.isValid}
									isTouched={formik.touched.firstName}
									invalidFeedback={formik.errors.firstName}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<div className='csm_form position-relative'>
								<div className='csm_label position-absolute top-1 start-2'>
									Select Level
								</div>
								<FormGroup id='exampleSelectOneWay'>
									<Select
										className='pt-4'
										ariaLabel='Default select example'
										placeholder='Select Level'
										onChange={formikOneWay.handleChange}
										value={formikOneWay.values.exampleSelectOneWay}
										list={SELECT_OPTIONS}
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-4'>
							<div className='csm_form position-relative'>
								<div className='csm_label position-absolute top-1 start-2'>
									Languages
								</div>
								<FormGroup id='exampleSelectOneWay'>
									<Select
										className='pt-4'
										ariaLabel='Default select example'
										placeholder='Select Languages'
										onChange={formikOneWay.handleChange}
										value={formikOneWay.values.exampleSelectOneWay}
										list={SELECT_OPTIONS}
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-md-4'>
							<FormGroup id='Mark' label='Mark' isFloating>
								<Input
									className=''
									placeholder='First Name'
									autoComplete='additional-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									isValid={formik.isValid}
									isTouched={formik.touched.firstName}
									invalidFeedback={formik.errors.firstName}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='url' label='Actual Solving Time' isFloating>
								<Input
									className=''
									placeholder='First Name'
									autoComplete='additional-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									isValid={formik.isValid}
									isTouched={formik.touched.firstName}
									invalidFeedback={formik.errors.firstName}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<div className='csm_form position-relative'>
								<div className='csm_label position-absolute top-1 start-2'>
									Select from down
								</div>
								<FormGroup id='exampleSelectOneWay'>
									<Select
										className='pt-4'
										ariaLabel='Default select example'
										placeholder='Open this select menu'
										onChange={formikOneWay.handleChange}
										value={formikOneWay.values.exampleSelectOneWay}
										list={SELECT_OPTIONS}
									/>
								</FormGroup>
							</div>
						</div>
					</div>
					<div className='d-flex gap-3 align-itms-center justify-content-center mt-3'>
						<Button icon='PublishedWithChanges' color='success' isLight className=''>
							Save
						</Button>
						<Button icon='Cancel' color='danger' isLight className=''>
							Cancel
						</Button>
					</div>
				</CardBody>
			</Card>

			<Card>
				<div className='d-flex justify-content-between mx-4 mb-1 mt-4'>
					<h4 className='fw-semibold m-0'>Quill Editor</h4>
				</div>
				<CardBody className='table-responsive'>quil</CardBody>
			</Card>
			<div
				className={classNames('rounded-3', {
					'shadow-3d-dark': !darkModeStatus,
					'shadow-3d-light': darkModeStatus,
					'bg-l10-dark': !darkModeStatus,
					'bg-lo50-info': darkModeStatus,
				})}>
				<div className='row row-cols-3 g-3 pb-3 px-3 mt-0'>
					{Object.keys(USER_APPOINTMENT).map((key) => (
						<div
							key={USER_APPOINTMENT[key]}
							className='col d-flex flex-column align-items-center'>
							<Button
								color={
									(darkModeStatus &&
										activeUserAppointmentTab === USER_APPOINTMENT[key]) ||
										!darkModeStatus
										? 'dark'
										: undefined
								}
								className='w-100 text-capitalize'
								rounded={1}
								onClick={() =>
									handleActiveUserAppointmentTab(USER_APPOINTMENT[key])
								}
								isLight={activeUserAppointmentTab !== USER_APPOINTMENT[key]}>
								<div className='h6 mb-3 opacity-80'>
									{USER_APPOINTMENT[key]}
								</div>
								<div
									className={classNames('h2', {
										'text-light': darkModeStatus,
									})}>
									{
										dataJohnAppointments.filter(
											(f) => f.status === USER_APPOINTMENT[key],
										).length
									}
								</div>
							</Button>
						</div>
					))}
				</div>
			</div>
		</PageWrapper>

	);
};

export default Index;
