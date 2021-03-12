import React, {
	ChangeEventHandler,
	useContext,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

import { UserI } from '../@interfaces';
import { UsersListContext } from '../context/index';
import { Button } from './custom/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddIcon from '@material-ui/icons/Add';

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.5em;
	letter-spacing: 2px;
	margin: 0.1em;
	width: 100px;
`;

const Card = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	border: 1px solid #ccc;
	border-radius: 10px;
	background-color: white;
	padding: 10px;
`;

const Modal: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [clientCode, setClientCode] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const { usersList, setUsersList, setSelectedUser, selectedUser } = useContext(
		UsersListContext
	);

	const transitions = useTransition(open, null, {
		from: {
			position: 'absolute',
			transform: 'translate3d(150px, -100px, 0)',
		},
		enter: {
			position: 'absolute',
			transform: 'translate3d(150px, -45px, 0)',
		},
		leave: {
			position: 'absolute',
			opacity: 1,
			transform: 'translate3d(150px, -100px, 0)',
		},
	});

	const addUser = () => {
		const newUser: UserI = {
			selected: true,
			username: userName,
			password,
			sessionKey: null,
			clientCode,
			credentials: {},
		};

		const newUsersList = [
			newUser,
			...usersList.map((user) => {
				user.selected = false;
				return user;
			}),
		];

		setUsersList(newUsersList);
	};

	const changeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUserName(e?.target.value || '');
	};

	const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e?.target.value || '');
	};

	const changeClientcode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClientCode(e?.target.value || '');
	};

	const toggleModal = () => {
		setOpen(!open);
	};

	return (
		<div>
			<Button
				icon={CheckCircleOutlineIcon}
				iconPlacement="left"
				variant={'primary'}
				onClick={toggleModal}
			>
				Add user
			</Button>
			{open &&
				transitions.map(
					({ item, key, props }) =>
						item && (
							<animated.div key={key} style={props}>
								<Card>
									<Input
										type="text"
										onChange={changeClientcode}
										placeholder="clientCode"
									/>
									<Input
										type="text"
										onChange={changeUsername}
										placeholder="username"
									/>
									<Input
										type="text"
										onChange={changePassword}
										placeholder="password"
									/>
									<Button
										icon={AddIcon}
										style={{ marginLeft: '1em', padding: 0 }}
										variant="primary"
										onClick={addUser}
									></Button>
								</Card>
							</animated.div>
						)
				)}
		</div>
	);
};

export default Modal;
