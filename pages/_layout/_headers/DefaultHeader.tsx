import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Button, { IButtonProps } from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Icon from '../../../components/icon/Icon';
// import Navigation from '../../../layout/Navigation/Navigation';
// import { componentPagesMenu, pageLayoutTypesPagesMenu } from '../../../menu';
// import useDeviceScreen from '../../../hooks/useDeviceScreen';
// import CommonHeaderRight from './CommonHeaderRight';

const DefaultHeader = () => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const styledBtn: IButtonProps = {
		color: darkModeStatus ? 'dark' : 'light',
		hoverShadow: 'default',
		isLight: !darkModeStatus,
		size: 'lg',
	};
	// const deviceScreen = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft>
				Left Header
				{/* <Navigation
					menu={{ ...pageLayoutTypesPagesMenu, ...componentPagesMenu }}
					id='header-top-menu'
					horizontal={
						!!deviceScreen?.width &&
						deviceScreen.width >= Number(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT_SIZE)
					}
				/> */}
				<Button
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...styledBtn}
					onClick={() => setDarkModeStatus(!darkModeStatus)}
					className='btn-only-icon'
					data-tour='dark-mode'>
					<Icon
						icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
						color={darkModeStatus ? 'info' : 'warning'}
						className='btn-icon'
					/>
				</Button>
			</HeaderLeft>
			{/* <CommonHeaderRight /> */}
		</Header>
	);
};

export default DefaultHeader;
