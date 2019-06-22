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
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(3)
    }
}))

const EditUserForm = (props: Props) => {
    const classes = useStyle({});
    return <Formik initialValues={{}} onSubmit={async (values, actions) => {

    }}>{({ errors, touched, error }) => <Form className={classes.root}>
        <Grid container>
            <Grid container spacing={2} md={4}>
                <Grid item xs={12}>
                    hihi
            </Grid>
            </Grid>
            <Grid container spacing={2} md={8}>
                <Grid item xs={12}>
                    <Field
                        name="data.firstName"
                        component={TextField}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="First Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="data.lastName"
                        component={TextField}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Last name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="data.displayName"
                        component={TextField}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Dispaly Name"
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
                    <Button color="primary" variant="contained">Save my profile</Button>
                </Grid>
            </Grid>
        </Grid>
    </Form>}</Formik>
}

export default EditUserForm;