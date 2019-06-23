import * as React from 'react'
import { Container, Paper } from '@material-ui/core';
import useCommonStyles from '../../utils/useCommonStyles'

const SettingsForm = () => {
    const commonClasses = useCommonStyles();

    return <Container>
        <Paper className={commonClasses.paper}>
            hihi
        </Paper>
    </Container>
}

export default SettingsForm;