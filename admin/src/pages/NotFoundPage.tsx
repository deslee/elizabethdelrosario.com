import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Theme, Typography } from '@material-ui/core';
import image from '../images/404.jpg'

interface ComponentProps {

}
type Props = ComponentProps;

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        textAlign: 'center'
    },
    image: {
        margin: theme.spacing(3)
    }
}))

const NotFoundPage = (props: Props) => {
    const classes = useStyle({});
    return <Container className={classes.root}>
        <img className={classes.image} src={image} alt="Not found" />
        <Typography>
            The page you request doesn't exist... the sadness.
        </Typography>
    </Container>
}


export default NotFoundPage;