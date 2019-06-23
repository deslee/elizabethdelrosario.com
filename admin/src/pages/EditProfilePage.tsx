import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Theme, Typography, Divider } from '@material-ui/core';
import EditUserForm from '../components/User/EditUserForm'
import UpdatePasswordForm from '../components/User/UpdatePasswordForm'
import UpdateEmailForm from '../components/User/UpdateEmailForm'

interface ComponentProps {

}
type Props = ComponentProps;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
    title: {
        marginTop: theme.spacing(3)
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(4)
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}))

const EditProfilePage = (props: Props) => {
    const classes = useStyle();
    return <Container className={classes.root} maxWidth="md">
        <Typography className={classes.title} variant="h4">Edit your profile</Typography>
        <Divider className={classes.divider} />
        <Typography variant="h5">Public Profile</Typography>
        <Paper className={classes.paper}>
            <EditUserForm />
        </Paper>
        <Divider className={classes.divider} />
        <Typography variant="h5">Change your password</Typography>
        <Paper className={classes.paper}>
            <UpdatePasswordForm />
        </Paper>
        <Divider className={classes.divider} />
        <Typography variant="h5">Change your email</Typography>
        <Paper className={classes.paper}>
            <UpdateEmailForm />
        </Paper>
    </Container>
}


export default EditProfilePage;