import * as React from 'react'
import { makeStyles } from '@material-ui/styles';
import { TextSlice } from '../../models/PostModel';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';
import { nameof } from '../../utils/TypeUtils';

interface Props {
    slice: TextSlice;
    name: string;
}

const useStyles = makeStyles(theme => ({
    textArea: {
    }
}))

const TextSliceComponent = ({ name }: Props) => {
    const classes = useStyles()

    return <>
        <Field
            name={`${name}.${nameof<TextSlice>('text')}`}
            type="text"
            component={TextField}
            className={classes.textArea} 
            multiline
            fullWidth
            rows={4}
            rowsMax={16}
            helperText="This supports Markdown"
        />
    </>
}

export default TextSliceComponent;