import * as React from 'react'
import { makeStyles } from '@material-ui/styles';
import { TextSlice } from './PostData';
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
    const [value, setValue] = React.useState('')

    return <>
        <Field
            name={`${name}.${nameof<TextSlice>('text')}`}
            type="text"
            component={TextField}
            className={classes.textArea} 
            multiline
            fullWidth
            rowsMax={16}
            helperText="This supports Markdown"
        />
    </>
}

export default TextSliceComponent;