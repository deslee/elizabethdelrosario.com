import * as React from 'react'
import { makeStyles, TextField, Button, Container, Grid, Typography } from '@material-ui/core';
import useCommonStyles from '../../utils/useCommonStyles'
import Portlet, { PortletHeader, PortletLabel, PortletContent, PortletFooter } from '../Portlet'
import Paper from '../Paper';

const useStyles = makeStyles(theme => ({
    root: {},
    form: {},
    textField: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

const SettingsForm = () => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();

    return <Container maxWidth="lg">
        <Grid container>
            <Grid item xs>
                <Paper className={commonClasses.paper}>
                    <Typography>Settings page</Typography>
                </Paper>
            </Grid>
        </Grid>
    </Container>
}

export default SettingsForm;