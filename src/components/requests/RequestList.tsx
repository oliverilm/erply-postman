import React, { useState } from 'react';
import styled from 'styled-components';
import { requests as requestList } from './list';
import Request from './Request';

const Main = styled.div`
	margin-top: 4%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const RowWrap = styled.div`
	margin-top: 1em;
	display: flex;
	flex-direction: row;
	flex: 1;
	flex-wrap: wrap;
`;

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.5em;
	letter-spacing: 2px;
	margin: 0.1em;
	width: 300px;
`;

const RequestList = (): JSX.Element => {
	const [searchString, setSearchString] = useState('');

	const search = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
	};

	const renderRequests = () => {
		return requestList
			.filter((request) =>
				request.request.toLowerCase().includes(searchString.toLowerCase())
			)
			.map((request) => {
				return <Request key={request.request} requestObj={request} />;
			});
	};

	return (
		<Main>
			<div>
				<Input type="text" placeholder="search..." onChange={search} />
			</div>
			<RowWrap>
				<div style={{ minWidth: 500 }}>{renderRequests()}</div>
				<div></div>
			</RowWrap>
		</Main>
	);
};

export default RequestList;
