import * as React from 'react';
import { Paper, Grid, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    sheet: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2),
    },
}))

export default function Dashboard() {
    const classes = useStyles({});

    return <Container maxWidth="lg">
        <Grid container>
            <Grid item xs>
                <Paper className={classes.sheet}>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.sheet}>
                </Paper>
            </Grid>
        </Grid>
    </Container>
}