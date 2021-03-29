import {
	Tabs,
	Tab,
	Box,
	Typography,
	makeStyles,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import MainRequest from './MainRequest';
import { requests as requestList, CustomerMsRequests } from './list';

const Col = styled.div`
	display: flex;
	flex-direction: column;
	width: 40vw;
	min-width: 40vw;
	flex-grow: 1;
`;

const RequestList = (): JSX.Element => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

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
				<Tab label="Erply API" {...a11yProps(0)} />
				<Tab label="Customer MS" {...a11yProps(1)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<MainRequest apiField={'ERPLY'} requests={requestList} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<MainRequest apiField={'CUSTOMER'} requests={CustomerMsRequests} />
			</TabPanel>
		</Col>
	);
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
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
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

export default RequestList;
