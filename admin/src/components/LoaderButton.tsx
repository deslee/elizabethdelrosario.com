import React from 'react'
import { makeStyles, CircularProgress, Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'inline-block'
    },
    buttonLoading: {
        visibility: 'hidden'
    },
    progressContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    progressSpinner: {
        display: 'block',
    },
}))

interface Props extends ButtonProps {
    loading: boolean;
    children: React.ReactNode;
    className?: string;
}

export default ({ loading, className, children, ...rest }: Props) => {
    const classes = useStyles({});
    return <div className={classes.root}>
        <Button
            className={clsx(className, { [classes.buttonLoading]: loading })}
            {...rest}
        >
            {children}
        </Button>
        {loading && <div className={classes.progressContainer}><CircularProgress className={classes.progressSpinner} /></div>}
    </div>
        
}