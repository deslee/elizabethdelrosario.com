import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Theme, Grid, Button, Divider } from '@material-ui/core';
import { TextField } from "formik-material-ui";
import { Field, Formik, Form } from 'formik';
import { compose } from 'recompose';
import { withUpdateUser, UpdateUserInjectedProps, withCurrentUser, WithCurrentUserInjectedProps } from './UserQueries';
import { UserData, jsonToUserData } from './UserData';
import FullPageLoading from '../FullPageLoading';

interface ComponentProps {

}
type Props = ComponentProps & UpdateUserInjectedProps & WithCurrentUserInjectedProps;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(3)
    }
}))

const EditUserForm = ({ updateUser, currentUser }: Props) => {
    const classes = useStyle({});
    console.log(currentUser)
    
    if (!currentUser.user) {
        return <FullPageLoading />
    }
    
    const userData = jsonToUserData(currentUser.user.data);

    return <Formik initialValues={{ firstName: userData.firstName || '', lastName: userData.lastName || '', displayName: userData.displayName || '' }} onSubmit={async (values, actions) => {
        try {
            await updateUser({
                variables: {
                    input: {
                        id: currentUser.user!.id,
                        patch: {
                            data: JSON.stringify({
                                firstName: values.firstName,
                                lastName: values.lastName,
                                displayName: values.displayName,
                            } as UserData)
                        }
                    }
                }
            })
        } finally {
            actions.setSubmitting(false);
        }
    }}>{({ errors, touched, error, submitForm }) => <Form className={classes.root}>
        <Grid container>
            <Grid container item spacing={2} md={4}>
                <Grid item xs={12}>
                    hihi
            </Grid>
            </Grid>
            <Grid container item spacing={2} md={8}>
                <Grid item xs={12}>
                    <Field
                        name="firstName"
                        component={TextField}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="First Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="lastName"
                        component={TextField}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Last name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="displayName"
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
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => submitForm()} color="primary" variant="contained">Save my profile</Button>
                </Grid>
            </Grid>
        </Grid>
    </Form>}</Formik>
}

export default compose<Props, ComponentProps>(
    withCurrentUser,
    withUpdateUser
)(EditUserForm);