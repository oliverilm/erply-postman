import React, { useState } from 'react';
import styled from 'styled-components';
import { requests as requestList } from './list';
import Request from './Request';

const Col = styled.div`
	display: flex;
	flex-direction: column;
`;

const Row = styled.div`
	margin-top: 1em;
	display: flex;
	flex-direction: row;
	flex: 1;
	min-height: 100%;
`;

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.5em;
	letter-spacing: 2px;
	margin: 0.1em;
	width: 300px;
`;

const Responses = styled.div`
	background-color: #34495e;
	width: 100%;
	min-height: 90vh;
	max-height: 90vh;
	margin: 1.5em;
	color: white;
	padding: 1em;
	overflow-y: scroll;
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
		<Row>
			<Col style={{ marginTop: '2em' }}>
				<div>
					<Input type="text" placeholder="search..." onChange={search} />
				</div>
				<div style={{ minWidth: 500 }}>{renderRequests()}</div>
			</Col>

			<Responses>
				{<pre>{JSON.stringify({ test: 'test' }, null, 2)}</pre>}
			</Responses>
		</Row>
	);
};

export default RequestList;
