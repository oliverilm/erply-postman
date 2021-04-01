import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../api';
import { UsersListContext } from '../../../context';
import { CafaRequestI, requestList } from '../requestLists/cafaRequests';
import CafaRequest from './CafaRequest';

interface CafaIndexProps {}

const Col = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.5em;
	letter-spacing: 2px;
	margin: 0.1em;
	width: 300px;
`;

const CafaIndex: React.FC<CafaIndexProps> = (): JSX.Element => {
	const [searchString, setSearchString] = useState('');
	const search = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
	};
	const { usersList } = useContext(UsersListContext);

	const [applications, setApplications] = useState<string[]>();
	const currentUser = usersList.find((user) => user.selected);

	useEffect(() => {
		if (currentUser) {
			api.CAFA.getApplications(currentUser, null).then((result) => {
				setApplications(result.data.applications);
			});
		}
	}, [usersList]);

	const placeApplicationsData = (req: CafaRequestI): CafaRequestI => {
		if (req.fields) {
			const applicationField = req.fields.find(
				(f) => f.name === 'application' || f.name === 'applicationName'
			);
			if (applicationField && applicationField.options) {
				applicationField.options = applications;
			}
		}
		return req;
	};

	const renderRequests = () => {
		return requestList
			.map(placeApplicationsData)
			.filter((el) =>
				el.request.toLowerCase().includes(searchString.toLowerCase())
			)
			.map((req) => {
				if (currentUser !== undefined) {
					return (
						<CafaRequest key={req.request} request={req} user={currentUser} />
					);
				}
			});
	};

	return (
		<Col>
			<div>
				<Input type="text" placeholder="search..." onChange={search} />
			</div>
			<div
				style={{
					minWidth: 500,
					minHeight: '82vh',
					maxHeight: '82vh',
					overflowY: 'scroll',
					overflowX: 'hidden',
					marginTop: 10,
				}}
			>
				{applications && applications.length > 0 && renderRequests()}
			</div>
		</Col>
	);
};

export default CafaIndex;
