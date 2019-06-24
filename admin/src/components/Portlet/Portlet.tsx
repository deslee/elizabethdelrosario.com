import React from 'react';

// Material helpers
import { makeStyles } from '@material-ui/core';

// Shared components
import Paper from '../Paper';
import clsx from 'clsx';

// Component styles
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    }
  }))

interface Props {
    children: React.ReactNode;
    className?: string
}

const Portlet = (props: Props) => {
  const { children, className, ...rest } = props;
  const classes = useStyles({})

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      elevation={0}
      outlined
      squared={false}
    >
      {children}
    </Paper>
  );
};

export default Portlet;
