import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, Grid, Button, Divider } from '@material-ui/core';
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

const UpdateEmailForm = () => {
    const classes = useStyle({});
    return <Formik initialValues={{}} onSubmit={async () => {

    }}>{() => <Form className={classes.root}>
        <Grid container>
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
        </Grid>
        <Divider className={classes.divider} light />
        <Grid container>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained">Update email</Button>
                </Grid>
            </Grid>
        </Grid>
    </Form>}</Formik>
}

export default UpdateEmailForm;