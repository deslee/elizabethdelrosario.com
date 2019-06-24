import React from 'react';

// Externals
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(),
    paddingTop: theme.spacing(),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  noDivider: {
    borderTop: 'none'
  }
}));

interface Props {
  children: any,
  className?: string
  noDivider?: boolean
}

const PortletFooter = (props: Props) => {
  const { className, noDivider = false, children, ...rest } = props;
  const classes = useStyles({});

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.noDivider]: noDivider
    },
    className
  );

  return <div {...rest} className={rootClassName}>{children}</div>
};

export default PortletFooter;
