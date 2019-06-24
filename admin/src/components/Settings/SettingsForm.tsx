import * as React from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core';
import useCommonStyles from '../../utils/useCommonStyles'
import Portlet, { PortletHeader, PortletLabel, PortletContent, PortletFooter } from '../Portlet'

const useStyles = makeStyles(theme => ({
    root: {},
    form: {},
    textField: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

const SettingsForm = () => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();

    return <div>
        Settings page
    </div>
}

export default SettingsForm;