import * as React from 'react';
import { Paper, Grid, InputAdornment, Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import Slices from './Slices';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Form, Field, FieldProps, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { PostInputWithData } from '../../models/PostModel';
import { useDialog } from '../../utils/DialogContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormChangesGuard from "../FormChangesGuard";
import clsx from 'clsx';
import useCommonStyles from '../../utils/useCommonStyles';

interface ComponentProps {
    onDelete?: () => Promise<void>;
    type: string;
}

interface Props extends FormikProps<PostInputWithData>, ComponentProps {

}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
        minHeight: `calc(100% - ${theme.spacing(3) * 2}px)`,
    },
    actionButtons: {
        textAlign: 'right'
    },
    saveAction: {
        marginLeft: theme.spacing(1),
        alignSelf: 'baseline',
        marginTop: theme.spacing(1)
    },
    deleteAction: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        alignSelf: 'start'
    },
    permaLink: {
        flexGrow: 1
    },
    top: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'wrap',
            justifyContent: 'flex-end'
        }
    },
    addNextSlice: {

    },
    error: {
        color: theme.palette.error.main,
    },
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -20,
      marginLeft: -5,
    },
}))

const PostForm = ({ isSubmitting, values, error, onDelete, type, dirty }: Props) => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();
    const { confirmDialog } = useDialog();
    const [showPassword, setShowPassword] = React.useState(false);

    return <Form className={classes.root}>
        <Paper className={clsx(commonClasses.innerPaper)}>
            <Grid container spacing={2}>
                <Grid item xs={12}><Typography className={classes.error}>{error}</Typography></Grid>
                <Grid item xs={12} className={classes.top}>
                    <Field
                        name="name"
                        component={TextField}
                        type="text"
                        variant="outlined"
                        className={classes.permaLink}
                        label="Permalink"
                        helperText="This will go in the url"
                        InputProps={{ startAdornment: <InputAdornment position="start">{`/${type.toLowerCase()}s/`}</InputAdornment> }}
                    />
                    {onDelete && <IconButton className={classes.deleteAction} aria-label="Delete" onClick={async () => (await confirmDialog(`Are you sure you want to delete this ${type[0].toUpperCase()}${type.substring(1).toLowerCase()}?`)) && onDelete()}>
                        <DeleteIcon fontSize="large" />
                    </IconButton>}
                    <div className={classes.wrapper}>
                        <Button disabled={isSubmitting} type="submit" className={classes.saveAction} size="large" color="primary" variant="contained">Save</Button>
                        {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="data.title"
                        type="text"
                        component={TextField}
                        fullWidth
                        label="Title"
                        helperText="The title of the post"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field
                        name="date"
                    >{({ field: { name, value, onBlur }, form: { setFieldValue, errors } }: FieldProps) =>
                        <DatePicker
                            fullWidth
                            helperText={!!errors[name] ? errors[name] : "The date of the post"}
                            label="Date"
                            value={value}
                            onChange={date => date && setFieldValue(name, date.toISOString())}
                            onBlur={onBlur}
                            name={name}
                            error={!!errors[name]}
                        />
                        }</Field>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Field
                        name="password"
                        component={TextField}
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        helperText={`Password protection is ${values["password"] ? 'enabled' : 'disabled'}`}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>

                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
        <Slices slices={values.data.slices || []} />
        <FormChangesGuard message="You have unsaved changes. Are you sure you want to leave?" />
    </Form>
}

export default PostForm;