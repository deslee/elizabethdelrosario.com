import React from 'react';

import clsx from 'clsx';

// Material helpers
import { makeStyles } from '@material-ui/core';

// Material components
import { Divider, Typography } from '@material-ui/core';

interface ComponentProps {
  className?: string
}
type Props = ComponentProps;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
}))

const Footer = ({ className }: Props) => {
  const classes = useStyles({})
  const rootClassName = clsx(classes.root, className);

  return (
    <div className={rootClassName}>
      <Divider />
      <Typography
        className={classes.company}
        variant="body1"
      >
        &copy; Desmond Lee 2019
        </Typography>
      <Typography variant="caption">
        Created with love for content.
        </Typography>
    </div>
  );
}

export default Footer;
