import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, Grid, Button } from '@material-ui/core';
import { TextField } from "formik-material-ui";
import { Field, Formik, Form } from 'formik';
import Portlet, { PortletHeader, PortletLabel, PortletContent, PortletFooter } from '../Portlet'


interface ComponentProps {

}
type Props = ComponentProps;


const useStyle = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(3)
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

const UpdatePasswordForm = () => {
    const classes = useStyle({});
    return <Formik initialValues={{}} onSubmit={async () => {

    }}>{() => <Form className={classes.root}>
        <Portlet>
            <PortletHeader>
                <PortletLabel
                    subtitle="Change your password"
                    title="Password"
                />
            </PortletHeader>
            <PortletContent>
                <form className={classes.form}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                name="oldPassword"
                                component={TextField}
                                fullWidth
                                type="password"
                                variant="outlined"
                                label="Old Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="newPassword"
                                component={TextField}
                                fullWidth
                                type="password"
                                variant="outlined"
                                label="New Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="confirmNewPassword"
                                component={TextField}
                                fullWidth
                                type="password"
                                variant="outlined"
                                label="Confirm New Password"
                            />
                        </Grid>
                    </Grid>
                </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
                <Button
                    color="primary"
                    variant="outlined"
                >
                    Update
            </Button>
            </PortletFooter>
        </Portlet>
    </Form>}</Formik>
}

export default UpdatePasswordForm;