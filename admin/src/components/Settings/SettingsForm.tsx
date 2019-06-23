import * as React from 'react'
import { Container, Paper, makeStyles } from '@material-ui/core';
import useCommonStyles from '../../utils/useCommonStyles'

const useStyles = makeStyles(theme => ({
}))

const SettingsForm = () => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();

    return <Container>
        <Paper className={commonClasses.paper}>
            hihi
        </Paper>
    </Container>
}

export default SettingsForm;