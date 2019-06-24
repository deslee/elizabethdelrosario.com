import React from 'react';

// Externals
import clsx from 'clsx';

// Material components
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: '1.3rem',
    marginRight: theme.spacing(),
    color: theme.palette.text.secondary,
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 500
  },
  subtitle: {
    fontWeight: 400,
    marginLeft: theme.spacing(),
    color: theme.palette.text.secondary
  }
}));

interface Props {
  icon?: React.ReactNode,
  title: string,
  subtitle: string,
  children?: any;
}

const PortletLabel = (props: Props) => {
  const { icon, title, subtitle, ...rest } = props;
  const classes = useStyles({});

  const rootClassName = clsx(classes.root);

  return (
    <div
      {...rest}
      className={rootClassName}
    >
      {icon && <span className={classes.icon}>{icon}</span>}
      {title && (
        <Typography
          className={classes.title}
          variant="h5"
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          className={classes.subtitle}
          variant="subtitle2"
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default PortletLabel;
