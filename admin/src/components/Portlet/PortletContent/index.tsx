import React from 'react';

// Externals
import clsx from 'clsx';

// Material helpers
import { makeStyles } from '@material-ui/core';

interface Props {
  children: any,
  noPadding?: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexGrow: 1
  },
  noPadding: {
    padding: 0
  }
}))

const PortletContent = (props: Props) => {
  const { children, noPadding = false, ...rest } = props;

  const classes = useStyles({})

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.noPadding]: noPadding
    }
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

export default PortletContent;
