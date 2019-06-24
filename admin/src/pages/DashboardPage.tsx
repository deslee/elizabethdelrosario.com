import * as React from 'react';
import { Grid, makeStyles, Container, Typography } from '@material-ui/core';
import Paper from '../components/Paper';

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
                    <Typography>Hello world</Typography>
                </Paper>
            </Grid>
        </Grid>
    </Container>
}