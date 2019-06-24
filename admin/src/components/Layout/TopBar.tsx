import React, { Fragment } from 'react';

// Externals
import clsx from 'clsx';

// Material helpers
import { makeStyles } from '@material-ui/core';

// Material components
import {
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Input as InputIcon
} from '@material-ui/icons';
import Logout from '../Logout';

interface ComponentProps {
  className?: string;
  title?: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}
type Props = ComponentProps

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing(1),
    flexGrow: 1
  },
  menuButton: {
    marginLeft: '-4px'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}))

const Topbar = ({ className, title, isSidebarOpen, onToggleSidebar = () => { } }: Props) => {
  const classes = useStyles()

  const rootClassName = clsx(classes.root, className);

  return (
    <Fragment>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
          >
            {<MenuIcon />}
          </IconButton>
          <Typography
            className={classes.title}
            variant="h4"
          >
            {title}
          </Typography>
          <Logout>
            <IconButton
              className={classes.signOutButton}
            >
              <InputIcon />
            </IconButton>
          </Logout>
        </Toolbar>
      </div>
    </Fragment>
  );
}

export default Topbar;
