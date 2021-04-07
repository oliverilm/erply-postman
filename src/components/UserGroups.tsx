import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	List,
	createStyles,
	makeStyles,
	Theme,
	ListSubheader,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import { UserI } from '../@interfaces';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { UserLink } from './UserLink';

interface UserGroupsProps {
	groups: { [key: string]: UserI[] };
}

interface GroupProps {
	name: string;
	collection: UserI[];
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
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();

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
				<ListItemText primary={name} />
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

	const renderGroups = () => {
		return Object.keys(groups).map((key) => {
			const users: UserI[] = groups[key];
			return <Group key={key} name={key} collection={users} />;
		});
	};

	return <List className={classes.root}>{renderGroups()}</List>;
};

export default UserGroups;
