import {
	ListItem,
	ListItemText,
	Collapse,
	List,
	createStyles,
	makeStyles,
	Theme,
	Badge,
	ListSubheader,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { useContext, useState } from 'react';
import { UserI } from '../@interfaces';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { UserLink } from './UserLink';
import { UsersListContext } from '../context';

interface UserGroupsProps {
	groups: { [key: string]: UserI[] };
}

interface GroupProps {
	name: string;
	collection: UserI[];
	includesSelected: boolean;
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

export const Group: React.FC<GroupProps> = ({
	name,
	collection,
	includesSelected,
}): JSX.Element => {
	const [open, setOpen] = useState(false);

	const renderAccounts = () => {
		return collection.map((user) => {
			return <UserLink key={user.id} user={user} />;
		});
	};
	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemText>
					<Badge color="primary" variant="dot" invisible={!includesSelected}>
						{name}
					</Badge>
				</ListItemText>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{renderAccounts()}
				</List>
			</Collapse>
		</>
	);
};

const UserGroups: React.FC<UserGroupsProps> = ({ groups }): JSX.Element => {
	const classes = useStyles();
	const { usersList } = useContext(UsersListContext);
	const selected = usersList.find((user) => user.selected);

	const selectedIndicator = selected
		? `${selected.clientCode} ${selected.username}`
		: 'None';

	const renderGroups = () => {
		return Object.keys(groups).map((key) => {
			const users: UserI[] = groups[key];

			return (
				<Group
					key={key}
					name={key}
					includesSelected={selected !== undefined && users.includes(selected)}
					collection={users}
				/>
			);
		});
	};

	return (
		<List
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Selected: {selectedIndicator}
				</ListSubheader>
			}
			className={classes.root}
		>
			{renderGroups()}
		</List>
	);
};

export default UserGroups;
