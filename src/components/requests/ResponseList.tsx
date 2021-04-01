import React, { useContext } from 'react';
import styled from 'styled-components';
import { ResponseContext } from '../../context';
import './json.css';
import { jsonDisplay } from '../../utils';
import { CircularProgress } from '@material-ui/core';
import ResponseHistory from './ResponseHistory';

const Responses = styled.div`
	background-color: #34495e;
	width: 100%;
	min-height: 90vh;
	max-height: 90vh;
	margin: 1.5em;
	color: white;
	padding: 1em;
	overflow-y: scroll;
	text-wrap: wrap;
	overflow-x: hidden;
	word-wrap: break-word;
`;

const ListOfPastResponses = styled.div`
	position: absolute;
	top: 40px;
	right: 60px;
`;

const ResponseList: React.FC = (): JSX.Element => {
	const { responses, isLoading } = useContext(ResponseContext);

	return (
		<Responses>
			{responses.length >= 0 && (
				<ListOfPastResponses>
					<ResponseHistory />
				</ListOfPastResponses>
			)}
			{isLoading ? (
				<CircularProgress style={{ color: '#fff' }} />
			) : (
				<pre
					dangerouslySetInnerHTML={{
						__html: jsonDisplay.outputPretty(
							JSON.stringify(
								responses[0]?.response.data ?? {
									message: 'No requests done',
								}
							)
						),
					}}
				></pre>
			)}
		</Responses>
	);
};

export default ResponseList;
