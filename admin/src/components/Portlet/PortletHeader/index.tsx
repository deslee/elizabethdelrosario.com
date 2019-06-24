import React from 'react';

// Externals
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
    display: 'flex',
    height: '64px',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    position: 'relative'
  },
  noDivider: {
    borderBottom: 'none'
  },
  noPadding: {
    padding: 0
  }
}));

interface Props {
  children: any,
  noPadding?: boolean,
  noDivider?: boolean
}

const PortletHeader = (props: Props) => {
  const { noDivider = false, noPadding = false, children, ...rest } = props;
  const classes = useStyles({});

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.noDivider]: noDivider,
      [classes.noPadding]: noPadding
    },
  );

  return (
    <div
      {...rest}
      className={rootClassName}
    >
      {children}
    </div>
  );
};

export default PortletHeader;
