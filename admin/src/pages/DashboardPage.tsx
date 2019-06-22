import * as React from 'react';
import {Paper, Grid, makeStyles, Container} from '@material-ui/core';
import UserInfo from '../components/UserInfo';
import Layout from '../components/Layout';

const useStyles = makeStyles(theme => ({
    sheet: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2),
    },
}))

export default function Dashboard() {
    const classes = useStyles({});

    return <Layout title="Dashboard">
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs>
                    <Paper className={classes.sheet}>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.sheet}>
                        <UserInfo />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Layout>
}