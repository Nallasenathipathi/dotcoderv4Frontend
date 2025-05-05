import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
// import { demoPagesMenu } from '../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import ThemeContext from '../context/themeContext';
import Page from '../layout/Page/Page';
import Popovers from '../components/bootstrap/Popovers';

const Index: NextPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			localStorage.getItem('tourModalStarted') !== 'shown' &&
			!mobileDesign
		) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const { themeStatus } = useDarkMode();

	// const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

	return (
		<PageWrapper>
			<div>
				<Head>
					{/* <title>{demoPagesMenu.sales.subMenu.dashboard.text}</title> */}
					<title>Page Title</title>
				</Head>
				<SubHeader>
					<SubHeaderLeft>
						<span className='h4 mb-0 fw-bold'>Overview</span>
						<SubheaderSeparator />
						{/* <ButtonGroup>
							{Object.keys(TABS).map((key) => (
								<Button
									key={key}
									color={activeTab === TABS[key] ? 'success' : themeStatus}
									onClick={() => setActiveTab(TABS[key])}>
									{TABS[key]}
								</Button>
							))}
						</ButtonGroup> */}
					</SubHeaderLeft>
					<SubHeaderRight>
						<Popovers title='index.tsx' desc={<code>pages/index.tsx</code>}>
							SubHeaderRight
						</Popovers>
					</SubHeaderRight>
				</SubHeader>

				<Page container='fluid'>
					<div className='row'>
						<div className='col-12 mb-3'>
							<Popovers title='index.tsx' desc={<code>pages/index.tsx</code>}>
								Page
							</Popovers>
							<code className='ps-3'>index.tsx</code>
						</div>
					</div>
				</Page>
			</div>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Index;
