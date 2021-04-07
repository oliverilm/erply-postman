import React, { useContext } from 'react';
import styled from 'styled-components';
import { ResponseContext } from '../../context';
import './json.css';
import { CircularProgress } from '@material-ui/core';
import ResponseHistory from './ResponseHistory';
// import ReactJson from 'react-json-view';
import { jsonDisplay } from '../../utils';

const Responses = styled.div`
	background-color: #34495e;
	width: 100%;
	min-height: 95vh;
	max-height: 95vh;
	margin: 1em;
	color: white;
	overflow-y: scroll;
	text-wrap: wrap;
	overflow-x: hidden;
`;

const ListOfPastResponses = styled.div`
	position: absolute;
	top: 20px;
	z-index: 1000;
	right: 40px;
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
				<CircularProgress style={{ color: '#000', zIndex: 10000 }} />
			) : (
				// <ReactJson
				// 	theme="ocean"
				// 	style={{ margin: 0, padding: '2em', minHeight: '100%' }}
				// 	displayObjectSize={false}
				// 	indentWidth={2}
				// 	displayDataTypes={false}
				// 	src={
				// 		responses[0]?.response.data ?? {
				// 			message: 'No requests done',
				// 		}
				// 	}
				// />
				/** React JSON viewer was too slow for large data objects. */
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
