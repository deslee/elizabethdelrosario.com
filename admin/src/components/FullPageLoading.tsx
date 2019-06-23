import React from 'react';
import { CircularProgress, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        backgroundColor: theme.palette.grey[200],
    },
    progress: {
        margin: theme.spacing(2)
    }
}))

export default () => {
    const classes = useStyles({});
    return <div className={classes.root}>
        <CircularProgress className={classes.progress} size={140} />
    </div>
}