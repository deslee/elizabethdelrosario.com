import * as React from 'react';
import {Field, Form, Formik} from "formik";
import {assetDataToJson, AssetWithData} from "../../models/AssetModel";
import {Grid} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {UpdateAssetInjectedProps, withUpdateAsset} from "../../data-access/AssetQueries";
import {useSnackbar} from "notistack";
import { compose } from 'recompose';


const EditAssetFormLayout = () =>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Field
                name="data.name"
                component={TextField}
                fullWidth
                type="text"
                variant="outlined"
                label="Name"
                helperText="The name of the asset"
            />
        </Grid>
        <Grid item xs={12}>
            <Field
                name="data.description"
                component={TextField}
                fullWidth
                type="text"
                variant="outlined"
                label="Description"
                helperText="The description of the asset"
            />
        </Grid>
        <Grid item xs={12}>
            <Field
                name="data.privateNotes"
                component={TextField}
                fullWidth
                multiline
                rowsMax={8}
                type="text"
                variant="outlined"
                label="Private Notes"
                helperText="Private notes are never shared publicly"
            />
        </Grid>
    </Grid>;

interface ComponentProps {
    assetEditing?: AssetWithData
    onClose: () => void
}

type Props = ComponentProps & UpdateAssetInjectedProps

const EditAssetDialogComponent = ({assetEditing, onClose, updateAsset} : Props) => {
    const { enqueueSnackbar } = useSnackbar();
    return assetEditing ? <Formik<AssetWithData> onSubmit={async (values, actions) => {
        try {
            await updateAsset({
                variables: {
                    input: {
                        id: values.id,
                        patch: {
                            state: values.state,
                            data: assetDataToJson( values && values.data)
                        }
                    }
                }
            });
            enqueueSnackbar('Success!', {variant: 'success'})
            onClose();
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'})
        } finally {
            actions.setSubmitting(false);
        }
    }} initialValues={{ ...assetEditing, data: {name: '', description: '', privateNotes: '', ...assetEditing.data}}} enableReinitialize>{({submitForm, touched}) => <Form>
    <Dialog open={assetEditing !== undefined} onClose={() => {Object.keys(touched).length === 0 && onClose()}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Asset</DialogTitle>
            <DialogContent>
                <EditAssetFormLayout />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => submitForm()} color="primary">
                    Save
                </Button>
            </DialogActions>
    </Dialog>
    </Form>}</Formik> : null;
};

export const EditAssetDialog = compose<Props, ComponentProps>(
    withUpdateAsset
)(EditAssetDialogComponent)
