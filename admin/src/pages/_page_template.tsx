import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Theme } from '@material-ui/core';
import Paper from '../components/Paper';
import useCommonStyles from '../utils/useCommonStyles'

interface ComponentProps {

}
type Props = ComponentProps;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
    }
}))

const EditProfilePage = (props: Props) => {
    const commonClasses = useCommonStyles();
    const classes = useStyle({});
    return <Container className={classes.root}>
        <Paper className={commonClasses.paper}>
            hi
        </Paper>
    </Container>
}


export default EditProfilePage;