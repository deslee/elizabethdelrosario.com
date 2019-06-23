import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Theme, Grid, Button, Divider } from '@material-ui/core';
import { TextField } from "formik-material-ui";
import { Field, Formik, Form } from 'formik';


interface ComponentProps {

}
type Props = ComponentProps;


const useStyle = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(3)
    }
}))

const UpdatePasswordForm = (props: Props) => {
    const classes = useStyle({});
    return <Formik initialValues={{}} onSubmit={async (values, actions) => {

    }}>{({ errors, touched, error }) => <Form className={classes.root}>
        <Grid container>
            <Grid container spacing={2}>
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
        </Grid>
        <Divider className={classes.divider} light />
        <Grid container>
            <Grid container spacing={2} xs={12}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained">Update Password</Button>
                </Grid>
            </Grid>
        </Grid>
    </Form>}</Formik>
}

export default UpdatePasswordForm;