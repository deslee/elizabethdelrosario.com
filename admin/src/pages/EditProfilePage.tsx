import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Theme, Typography, Divider } from '@material-ui/core';
import Paper from '../components/Paper';
import EditUserForm from '../components/User/EditUserForm'
import UpdatePasswordForm from '../components/User/UpdatePasswordForm'
import UpdateEmailForm from '../components/User/UpdateEmailForm'
import clsx from 'clsx';
import useCommonStyles from '../utils/useCommonStyles';

interface ComponentProps {

}
type Props = ComponentProps;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
    title: {
        marginTop: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}))

const EditProfilePage = (props: Props) => {
    const commonClasses = useCommonStyles();
    const classes = useStyle();
    return <Container className={classes.root}>
        <Typography className={classes.title} variant="h4">Edit your profile</Typography>
        <Divider className={classes.divider} />
        <Typography variant="h5">Public Profile</Typography>
        <Paper className={clsx(commonClasses.innerPaper)}>
            <EditUserForm />
        </Paper>
        <Divider className={classes.divider} />
        <UpdatePasswordForm />
        <Divider className={classes.divider} />
        <UpdateEmailForm />
    </Container>
}


export default EditProfilePage;