import React from 'react';

// Externals
import clsx from 'clsx';

// Material helpers
import { makeStyles } from '@material-ui/core';

// Material components
import { Paper } from '@material-ui/core';

// Component styles
const useStyles = makeStyles(theme => {
  return {
    root: {
      borderRadius: '4px'
    },
    squared: {
      borderRadius: 0
    },
    outlined: {
      border: `1px solid ${theme.palette.divider}`
    }
  };
});

interface Props {
  children: React.ReactNode,
  elevation?: number,
  outlined?: boolean,
  squared?: boolean,
  className?: string
}

const CustomPaper = (props: Props) => {
  const { className, outlined = true, squared = false, elevation = 0, children, ...rest } = props;
  const classes = useStyles({})

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );

  return (
    <Paper
      {...rest}
      elevation={elevation}
      className={rootClassName}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
