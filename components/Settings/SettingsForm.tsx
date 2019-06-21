import * as React from 'react'
import { Container, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4)
    }
}))

const SettingsForm = () => {
    const classes = useStyles();

    return <Container>
        <Paper className={classes.paper}>
            hihi
        </Paper>
    </Container>
}

export default SettingsForm;