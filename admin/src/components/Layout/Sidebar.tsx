import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  NotesOutlined as PostsIcon,
  CollectionsOutlined as AssetsIcon,
  LibraryBooksOutlined as PagesIcon,
  ExitToAppOutlined as LogoutIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';
import clsx from 'clsx';
import Logout from '../Logout';

// Component styles
import clientLogo from '../../images/header.jpg'
import logo from '../../images/logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '63px',
    flexShrink: 0
  },
  logoLink: {
    fontSize: 0
  },
  logoImage: {
    cursor: 'pointer',
    height: '32px'
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  nameText: {
    marginTop: theme.spacing(2)
  },
  bioText: {},
  profileDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    '& $listItemText': {
      color: theme.palette.text.primary
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}))

interface ComponentProps {
  className?: string
}
type Props = ComponentProps;

const Sidebar = ({ className }: Props) => {
  const classes = useStyles()

  return (
    <nav className={clsx(classes.root, className)}>
      <div className={classes.logoWrapper}>
        <Link
          className={classes.logoLink}
          to="/"
        >
          <img
            alt="logo"
            className={classes.logoImage}
            src={logo}
          />
          <Typography variant="h2" component="span">Admin</Typography>
        </Link>
      </div>
      <Divider className={classes.logoDivider} />
      <div className={classes.profile}>
        <Link to="/account">
          <Avatar
            alt="Client Logo"
            className={classes.avatar}
            src={clientLogo}
          />
        </Link>
        <Typography
          className={classes.nameText}
          variant="h6"
        >
          Elizabeth Del Rosario
          </Typography>
        <Typography
          className={classes.bioText}
          variant="caption"
        >
          A Storyboard and Visual Development Artist.
          </Typography>
      </div>
      <Divider className={classes.profileDivider} />
      <List
        component="div"
        disablePadding
      >
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin"
          exact
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Dashboard"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/posts"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PostsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Pages"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/pages"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PagesIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Posts"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/assets"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AssetsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Assets"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/settings"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Settings"
          />
        </ListItem>
      </List>
      <Divider className={classes.listDivider} />
      <List
        component="div"
        disablePadding
        subheader={
          <ListSubheader className={classes.listSubheader}>
            Account
            </ListSubheader>
        }
      >
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/profile"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Profile"
          />
        </ListItem>
        <Logout>
          <ListItem
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Log Out"
            />
          </ListItem>
        </Logout>
      </List>
    </nav>
  );
}

export default Sidebar;
