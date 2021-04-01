import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MainRequest from './MainRequest';
import { requests as requestList } from './requestLists/erplyRequests';
import { UsersListContext } from '../../context';
import CafaIndex from './cafa/CafaIndex';
import { hasCafaAccess, hasCustomerAPIAccess } from './scripts/permissions';
import { CustomerMsRequests } from './requestLists/customerMsRequests';

const Col = styled.div`
	display: flex;
	flex-direction: column;
	width: 40vw;
	min-width: 40vw;
	flex-grow: 1;
`;

const RequestList: React.FC = (): JSX.Element => {
	const [value, setValue] = useState(0);
	const { usersList } = useContext(UsersListContext);
	const [userSelected, setUserSelected] = useState<boolean>(false);
	const [hasCRUrls, setHasCRUrls] = useState<boolean>(false);
	const [hasCafaEnabled, setHasCafaEnabled] = useState<boolean>(false);

	const handleChange = (
		event: React.ChangeEvent<unknown>,
		newValue: number
	) => {
		setValue(newValue);
	};

	useEffect(() => {
		const selectedUser = usersList.find((user) => user.selected);

		if (selectedUser) {
			setUserSelected(true);
			const hasUrls = hasCustomerAPIAccess(selectedUser);
			const hasCafa = hasCafaAccess(selectedUser);

			setHasCRUrls(hasUrls);
			setHasCafaEnabled(hasCafa);

			if ((!hasCRUrls && value === 1) || (!hasCafa && value === 2)) {
				setValue(0);
			}
		} else {
			setUserSelected(false);
			setHasCRUrls(false);
			setHasCafaEnabled(false);
			if (value === 1 || value === 2) setValue(0);
		}
	});

	return (
		<Col>
			<Tabs
				style={{ marginTop: '1em' }}
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
			>
				<Tab disabled={!userSelected} label="Erply API" {...a11yProps(0)} />
				<Tab
					disabled={!userSelected || !hasCRUrls}
					label={'Customer MS'}
					{...a11yProps(1)}
				/>
				<Tab
					disabled={!userSelected || !hasCafaEnabled}
					label={'CAFA API'}
					{...a11yProps(2)}
				/>
			</Tabs>

			<TabPanel value={value} index={0}>
				<MainRequest apiField={'ERPLY'} requests={requestList} />
			</TabPanel>

			<TabPanel value={value} index={1}>
				<MainRequest apiField={'CUSTOMER'} requests={CustomerMsRequests} />
			</TabPanel>

			<TabPanel value={value} index={2}>
				<CafaIndex />
			</TabPanel>
		</Col>
	);
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: unknown;
	value: unknown;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component={'span'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

export default RequestList;
