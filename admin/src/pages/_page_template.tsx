import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Theme } from '@material-ui/core';

interface ComponentProps {

}
type Props = ComponentProps;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4)
    }
}))

const EditProfilePage = (props: Props) => {
    const classes = useStyle({});
    return <Container className={classes.root}>
        <Paper className={classes.paper}>
            hi
        </Paper>
    </Container>
}


export default EditProfilePage;