import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, Grid, Button, Divider } from '@material-ui/core';
import { TextField } from "formik-material-ui";
import { Field, Formik, Form } from 'formik';
import Portlet, { PortletHeader, PortletLabel, PortletContent, PortletFooter } from '../Portlet'
import LoaderButton from '../LoaderButton';

interface ComponentProps {

}
type Props = ComponentProps;


const useStyle = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(3)
    },
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
}))

const UpdateEmailForm = () => {
    const classes = useStyle({});
    return <Formik initialValues={{}} onSubmit={async () => {

    }}>{({isSubmitting}) => <Form className={classes.root}>
        <Portlet>
            <PortletHeader>
                <PortletLabel
                    subtitle="Change your email"
                    title="Email"
                />
            </PortletHeader>
            <PortletContent>
                <Grid container item spacing={2}>
                    <Grid item xs={12}>
                        <Field
                            name="email"
                            component={TextField}
                            fullWidth
                            type="email"
                            variant="outlined"
                            label="New email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="password"
                            component={TextField}
                            fullWidth
                            type="password"
                            variant="outlined"
                            label="Confirm with your password"
                        />
                    </Grid>
                </Grid>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
                <LoaderButton loading={isSubmitting} color="primary" variant="outlined">Update Email</LoaderButton>
            </PortletFooter>
        </Portlet>
    </Form>}

    </Formik>
}

export default UpdateEmailForm;