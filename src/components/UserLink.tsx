import {
	createStyles,
	ListItem,
	ListItemText,
	makeStyles,
	Theme,
} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { UserI } from '../@interfaces';
import { ResponseContext, UsersListContext } from '../context/index';
import './modalStyle.css';
import UserManager from '../api/user';
import { Divider, FormControl, Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { Button } from './custom/Button';
import { generatePostmanProfile } from './requests/scripts/postman';
import UserDetailModal from './UserDetail';
import { v4 as uuidv4 } from 'uuid';
import {
	ContextMenu,
	MenuItem as ContextMenuItem,
	ContextMenuTrigger,
} from 'react-contextmenu';

interface UserLinkProps {
	user: UserI;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
);

interface TimeI {
	hours: number;
	minutes: number;
	seconds: number;
}

const attributes = {
	className: 'custom-root',
};

export const UserLink: React.FC<UserLinkProps> = ({ user }): JSX.Element => {
	const classes = useStyles();

	const { clientCode, username, selected } = user;
	const { setSelectedUser, updateUser } = useContext(UsersListContext);
	const userManager = new UserManager(user);
	const [timeTilEnd, setTimeTilEnd] = useState<TimeI | null>(null);
	const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
	const { addResponse, setIsLoading } = useContext(ResponseContext);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeTilEnd(timeUntilAuthEnd());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [user]);

	const selectUser = () => {
		setSelectedUser(user);
	};

	const isAuthenticated = () => {
		return userManager.isAuthenticated();
	};

	const timeUntilAuthEnd = () => {
		const endDate = userManager.authEndTime();
		const currentDate = new Date();
		if (endDate) {
			const distance = endDate.getTime() - currentDate.getTime();
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			return { hours, minutes, seconds };
		}
		return null;
	};

	const login = async () => {
		setIsLoading(true);

		const { user, response } = await userManager.login();
		addResponse({
			request: 'verifyUser',
			response,
			error: response.data.status.errorCode > 0,
			user,
			time: +new Date() / 1000,
		});
		updateUser(user);
		setIsLoading(false);
	};

	const formatNr = (nr: number | undefined) => {
		if (nr === undefined) return ' -- ';
		return (nr ?? 0).toString().padStart(2, '0');
	};

	const getAuthStr = () => {
		const hh = formatNr(timeTilEnd?.hours);
		const mm = formatNr(timeTilEnd?.minutes);
		const ss = formatNr(timeTilEnd?.seconds);
		return isAuthenticated() ? `${hh}:${mm}:${ss}` : 'xx:xx:xx';
	};

	return (
		<>
			<ContextMenuTrigger id={`user-custom-context-${user.id}`}>
				<ListItem
					style={{ cursor: 'pointer' }}
					divider
					className={classes.nested}
				>
					<ListItemText
						style={{ color: isAuthenticated() ? '##2ecc71' : '#ccc' }}
						secondary={`${user.clientCode} - ${user.username} ${getAuthStr()}`}
					/>
				</ListItem>
				{/* <ListCard
					className={`user-card ${selected ? 'selected' : ''}`}
					onDoubleClick={selectUser}
				>
					<ListCardContent style={{ flex: 1, minHeight: '2em' }}>
						<ListCardRow
							style={{ alignItems: 'flex-start' }}
							className={'user-card-detail'}
						>
							<div>
								{clientCode} - {username}
							</div>
							<div>
								{isAuthenticated() ? (
									<div>{`${formatNr(timeTilEnd?.hours)}:${formatNr(
										timeTilEnd?.minutes
									)}:${formatNr(timeTilEnd?.seconds)}`}</div>
								) : (
									<BlockIcon color="error" />
								)}
							</div>
						</ListCardRow>
					</ListCardContent>
				</ListCard> */}
			</ContextMenuTrigger>
			<ContextMenu id={`user-custom-context-${user.id}`}>
				<ContextMenuItem
					data={{ action: 'copy' }}
					onClick={login}
					attributes={attributes}
				>
					Authenticate
				</ContextMenuItem>

				<ContextMenuItem divider />

				<ContextMenuItem
					data={{ action: 'paste' }}
					onClick={selectUser}
					attributes={attributes}
				>
					Select User
				</ContextMenuItem>

				<ContextMenuItem
					data={{ action: 'paste' }}
					onClick={() => {
						setIsViewOpen(true);
					}}
					attributes={attributes}
				>
					User Details
				</ContextMenuItem>
				<ContextMenuItem divider />
				<ContextMenuItem
					data={{ action: 'delete' }}
					onClick={() => {
						generatePostmanProfile(user);
					}}
					attributes={attributes}
				>
					Postman Profile
				</ContextMenuItem>
			</ContextMenu>
			<UserDetailModal
				onClose={() => {
					setIsViewOpen(false);
				}}
				open={isViewOpen}
				user={user}
			/>
		</>
	);
};
