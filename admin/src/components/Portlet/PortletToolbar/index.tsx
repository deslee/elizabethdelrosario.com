import React from 'react';

// Material components
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex'
  }
}))

interface Props {
  children: any;
}

const PortletToolbar = (props: Props) => {
  const { children, ...rest } = props;
  const classes = useStyles({})

  return <div
      {...rest}
      className={classes.root}
    >
      {children}
    </div>
};

export default PortletToolbar;
