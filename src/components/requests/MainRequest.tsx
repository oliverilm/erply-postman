import React, { useState } from 'react';
import styled from 'styled-components';
import { RequestType } from '../../@types';
import { RequestI } from './list';
import Request from './Request';

interface MainRequestProps {
	apiField: string;
	requests: RequestI[];
	children?: React.ReactNode;
}

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

const MainRequest: React.FC<MainRequestProps> = ({
	apiField = 'ERPLY',
	requests,
}): JSX.Element => {
	const [searchString, setSearchString] = useState('');
	const search = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
	};

	const renderRequests = () => {
		return requests
			.filter((request) =>
				request.request.toLowerCase().includes(searchString.toLowerCase())
			)
			.map((request) => {
				return (
					<Request
						key={request.request}
						requestObj={request}
						apiField={apiField as RequestType}
					/>
				);
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
				{renderRequests()}
			</div>
		</Col>
	);
};

export default MainRequest;
