import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../api';
import { ResponseContext, UsersListContext } from '../../../context';
import Search from '../../custom/Search';
import { CafaRequestI, requestList } from '../requestLists/cafaRequests';
import CafaRequest from './CafaRequest';

interface CafaIndexProps {}

const Col = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const CafaIndex: React.FC<CafaIndexProps> = (): JSX.Element => {
	const [searchString, setSearchString] = useState('');
	const { usersList, selectedUser } = useContext(UsersListContext);
	const { isLoading } = useContext(ResponseContext);

	const [applications, setApplications] = useState<string[]>();
	const currentUser = usersList.find((user) => user.selected);

	useEffect(() => {
		if (currentUser) {
			api.CAFA.getApplications(currentUser, null).then((result) => {
				setApplications(result.data.applications);
			});
		}
	}, [usersList, selectedUser, isLoading]);

	const search = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
	};

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
				<Search
					placeholder="search..."
					value={searchString}
					onClear={() => setSearchString('')}
					onChange={search}
				/>
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
