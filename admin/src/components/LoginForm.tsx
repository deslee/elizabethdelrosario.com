import * as React from 'react';
import { Button, Typography, FormControlLabel, Checkbox, makeStyles, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { graphql, withApollo, WithApolloClient, ChildMutateProps } from 'react-apollo';
import { TextField } from 'formik-material-ui';
import gql from "graphql-tag";
import { LoginPayload, LoginInput } from 'api';

interface ComponentProps {
    onLogin?: () => void
}
type ChildProps = ChildMutateProps<ComponentProps, LoginResult, LoginVariables>;
type Props = WithApolloClient<ChildProps>

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: theme.palette.error.main
    } 
}));  

const LoginForm: React.FC<Props> = ({ mutate: login, client, onLogin = () => {} }) => {
    const classes = useStyles({});
    return <>
        <Formik<LoginInput>
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, actions) => {
                try {
                    const loginResult = await login({
                        variables: {
                            input: {
                                email: values.email,
                                password: values.password
                            } as LoginInput
                        }
                    });
                    if (loginResult && loginResult.data && loginResult.data.login) {
                        // Force a reload of all the current queries now that the user is
                        // logged in
                        client.resetStore();
                        actions.resetForm();
                        onLogin();
                    } else {
                        actions.setError("Login failed");
                    }
                }
                finally {
                    actions.setSubmitting(false);
                }
            }}
        >{({ error, isSubmitting }) => <Form>
            {isSubmitting && <LinearProgress />}
            <Typography className={classes.error}>{error}</Typography>
            <Field
                name="email" 
                component={TextField} 
                type="text" 
                label="Email" 
                fullWidth
                autoFocus
                margin="normal"
                variant="outlined"
            /><br />
            <Field 
                name="password" 
                component={TextField} 
                type="password" 
                label="Password" 
                fullWidth
                margin="normal"
                variant="outlined"
            /><br />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
        </Form>}</Formik>
    </>
}
interface LoginVariables {
    input: LoginInput
}
export interface LoginResult {
    login: LoginPayload
}



export default withApollo(graphql<WithApolloClient<ComponentProps>, LoginResult, LoginVariables, ChildProps>(gql`
mutation Login($input: LoginInput!) {
    login(input: $input) {
        token
        user {
            id
            email
            data
        }
    }
}
`)(LoginForm))