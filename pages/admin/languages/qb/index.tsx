import React, { useState , useEffect, useRef } from 'react';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import useDarkMode from '../../../../hooks/useDarkMode';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Select from '../../../../components/bootstrap/forms/Select';
import Button from '../../../../components/bootstrap/Button';
import { IServiceProps } from '../../../../common/data/serviceDummyData';
import TestCase from '../test_case/index'
// import useDarkMode from '../../../../hooks/useDarkMode';
import classNames from 'classnames';
import Icon from '../../../../components/icon/Icon';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.bootstrap5.css';
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
	const selectRef2 = useRef<HTMLSelectElement | null>(null);
	useEffect(() => {
		const interval = setInterval(() => {
		  const el = selectRef2.current;
		  if (el && el.offsetParent !== null) {
			// visible and in DOMx
			if (!(el as any)._tom) {
			  new TomSelect(el, {
				plugins: ['remove_button'],
				create: true,
				persist: false,
			  });
			}
			clearInterval(interval); // cleanup
		  }
		}, 100); // check every 100ms
	  
		return () => clearInterval(interval); // cleanup on unmount
	  }, []);

	const selectRef = useRef<HTMLSelectElement | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
		  const el = selectRef.current;
		  if (el && el.offsetParent !== null) {
			// visible and in DOMx
			if (!(el as any)._tom) {
			  new TomSelect(el, {
				plugins: ['remove_button'],
				create: true,
				persist: false,
			  });
			}
			clearInterval(interval); // cleanup
		  }
		}, 100); // check every 100ms
	  
		return () => clearInterval(interval); // cleanup on unmount
	  }, []);
	  

	const [doc, setDoc] = useState(
		(typeof window !== 'undefined' &&
			localStorage.getItem('facit_asideDocStatus') === 'true') ||
			false,
	);

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
	type TListTab = {
		name:string
		icon:string
	};

	// const { darkModeStatus } = useDarkMode();
	// const LIST_TAB: { [key: string]: TListTab } = {
	// 	EMPLOYEES: 'Employees1',
	// 	SERVICE: 'Services',
	// 	PACKAGE: 'Packages',
	// };
	const LIST_TAB:TListTab[]=[
		{
			name:'Header',
			icon: 'SportsVolleyball'
		}
		,{
			name:'Body',
			icon: 'Hiking'
		},{
			name:'Footer',
			icon: 'SportsVolleyball'

		}
	]
	const [activeListTab, setActiveListTab] = useState(LIST_TAB[0].name);
	const handleActiveListTab = (tabName: string) => {
		setActiveListTab(tabName);
	};
	const getStatusActiveListTabColor = (tabName: string): 'success' | 'light' => {
		if (activeListTab === tabName) return 'success';
		return 'light';
	};



	const LIST_TAB2:TListTab[]=[
		{
			name:'Visibe Testcase',
			icon: 'SportsVolleyball'
		}
		,{
			name:'Random Testcase',
			icon: 'Hiking'
		},{
			name:'Special Testcase',
			icon: 'SportsVolleyball'

		}
	]
	const [activeListTab2, setActiveListTab2] = useState(LIST_TAB2[0].name);
	const handleActiveListTab2 = (tabName: string) => {
		setActiveListTab2(tabName);
	};
	const getStatusActiveListTabColor2 = (tabName: string): 'success' | 'light' => {
		if (activeListTab2 === tabName) return 'success';
		return 'light';
	};

	
	return (
		<PageWrapper>
			<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle>Language</CardTitle>
				</CardLabel>
				<CardActions>
				<Button icon='ControlPoint' color='success' isLight className=''>
								Create
				</Button>
				</CardActions>
			</CardHeader>
				<CardBody>	
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
			<CardHeader>
				<CardLabel>
					<CardTitle>Quill</CardTitle>
				</CardLabel>
				
			</CardHeader>
				<CardBody className='table-responsive'>quil</CardBody>
			</Card>
			<Card>				
			<CardHeader>
				<CardLabel>
					<CardTitle>Solution</CardTitle>
				</CardLabel>
				<CardActions>
					<div className='bg-light p-2 rounded-3'>
						{LIST_TAB.map((tab) => (
							<Button
								key={tab.name}
								icon={tab.icon}
								
								color={getStatusActiveListTabColor(tab.name)}
								onClick={() => handleActiveListTab(tab.name)}>
								{tab.name}
							</Button>
						))}
					</div>
				</CardActions>
			</CardHeader>
			<CardBody className='table-responsive'>
				{activeListTab === 'Header' && <div> tab1 </div> }
				{activeListTab === 'Body' && <div> tab2 </div>}
				{activeListTab === 'Footer' && <div> tab3 </div>}
			</CardBody>
			</Card>

			<Card>				
			<CardHeader>
				<CardLabel>
					<CardTitle>TestCase</CardTitle>
				</CardLabel>
				<CardActions>
					<div className='bg-light p-2 rounded-3'>
						{LIST_TAB2.map((tab) => (
							<Button
								key={tab.name}
								icon={tab.icon}
								
								color={getStatusActiveListTabColor2(tab.name)}
								onClick={() => handleActiveListTab2(tab.name)}>
								{tab.name}
							</Button>
						))}
					</div>
				</CardActions>
			</CardHeader>
			<CardBody className='table-responsive'>
				{activeListTab2 === 'Visibe Testcase' && <TestCase/> }
				{activeListTab2 === 'Random Testcase' && <div> saasm</div>}
				{activeListTab2 === 'Special Testcase' && <TestCase/>}
				<div className='row g-4 mt-2'>
						<div className='col-md-6 position-relative'>
						
						<div 
							role='presentation' style={{top:'8px', right:'0'}}
							className='navigation-item cursor-pointer position-absolute top-1 z-3'
							onClick={() => {
								localStorage.setItem('facit_asideDocStatus', String(!doc));
								setDoc(!doc);
							}}
							>
							<span style={{color:'#8c8c8c'}}>
								<span className='navigation-link-info'>
									<Icon
										icon={doc ? 'ToggleOn' : 'ToggleOff'}
										color={doc ? 'success' : undefined}
										className='navigation-icon'
									/>
									
								</span>
								
							</span>
						</div>
							<FormGroup id='firstName' label='Question Title' isFloating>
								<Input disabled
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
						<div className='col-md-6 position-relative'>
						
						<div 
							role='presentation' style={{top:'8px', right:'0'}}
							className='navigation-item cursor-pointer position-absolute top-1 z-3'
							onClick={() => {
								localStorage.setItem('facit_asideDocStatus', String(!doc));
								setDoc(!doc);
							}}
							>
							<span style={{color:'#8c8c8c'}}>
								<span className='navigation-link-info'>
									<Icon
										icon={doc ? 'ToggleOn' : 'ToggleOff'}
										color={doc ? 'success' : undefined}
										className='navigation-icon'
									/>
									
								</span>
								
							</span>
						</div>
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
						
				</div>
				<div className='row'>
					
					<div className="mb-3 col-md-6 position-relative mt-4">
								<div className='csm_label position-absolute top-1 start-2 z-1' style={{left:'22px'}}>
									Languages
								</div>
						  
						  <select
							id="college"
							
							ref={selectRef}
							className="form-select csm_tom_select"
							multiple
						  ><option value="" disabled selected hidden>
						  Select or add colleges...
						</option>
							<option value="1">SKCT</option>
							<option value="2">PSG</option>
							<option value="3">KCT</option>
						  </select>
					</div>

					<div className="mb-3 col-md-6 position-relative mt-4">
								<div className='csm_label position-absolute top-1 start-2 z-1' style={{left:'22px'}}>
									Languages
								</div>
						  
						  <select
							id="college"
							
							ref={selectRef2}
							className="form-select csm_tom_select"
							multiple
						  ><option value="" disabled selected hidden>
						  Select or add colleges...
						</option>
							<option value="1">SKCT</option>
							<option value="2">PSG</option>
							<option value="3">KCT</option>
						  </select>
					</div>
				</div>

				<div className='d-flex gap-3 align-itms-center justify-content-center mt-3'>
						<Button icon='SlowMotionVideo' color='info' isLight className=''>
							Run
						</Button>
						<Button icon='PublishedWithChanges' color='success' isLight className=''>
							Save
						</Button>
						<Button icon='Cancel' color='danger' isLight className=''>
							Cancel
						</Button>
					</div>
				

				
			</CardBody>
			</Card>
			
			
		</PageWrapper>

	);
};

export default Index;
