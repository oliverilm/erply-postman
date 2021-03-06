import React, { useState } from 'react';
import styled from 'styled-components';
import { RequestType } from '../../@types';
import { RequestI } from './requestLists/erplyRequests';
import Request from './Request';
import Search from '../custom/Search';
import PluginStorage from '../../api/storage';

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
			.sort((a, b) => {
				return a.request.localeCompare(b.request);
			})
			.sort((a, b) => {
				return PluginStorage.isFav(a.request) === PluginStorage.isFav(b.request)
					? 0
					: PluginStorage.isFav(a.request)
					? -1
					: 1;
			})
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
					minHeight: '1vh',
					maxHeight: '84vh',
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
