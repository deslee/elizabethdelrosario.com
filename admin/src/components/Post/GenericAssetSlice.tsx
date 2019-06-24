import * as React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { ImagesSlice, isImagesSlice, PostInputWithData, VideoSlice } from '../../models/PostModel';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
    GetAssetListVariables,
    AssetListInjectedProps,
    withAssetList
} from "../../data-access/AssetQueries";
import { assetFilter, AssetType, AssetWithData, jsonToAssetData } from "../../models/AssetModel";
import Grid from "@material-ui/core/Grid";
import AssetListCard from "../Asset/AssetListCard";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { connect, FieldArray, FormikContext } from 'formik';
import { Asset } from "api";
import CardActions from "@material-ui/core/CardActions";
import posed, { PoseGroup } from 'react-pose';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    addAssetButton: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    assetGrid: {
        marginTop: theme.spacing(3)
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

interface ComponentProps extends GetAssetListVariables {
    slice: ImagesSlice | VideoSlice;
    name: string;
    type: AssetType
}

type Props = ComponentProps & { formik: FormikContext<PostInputWithData> } & AssetListInjectedProps;

const assetToAssetWithData: (asset: Asset) => AssetWithData = asset => ({ ...asset, data: jsonToAssetData(asset.data) } as AssetWithData);

const useDialogStyles = makeStyles((theme: Theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    empty: {
    }
}));


const SelectAssetDialog = ({ open, close, onAdded, assets }: { open: boolean, close: () => void, onAdded: (asset: AssetWithData) => void, assets: AssetWithData[] }) => {
    const classes = useDialogStyles();

    const renderAssetList = (assets: AssetWithData[]) => {
        return <Grid container spacing={2}>
            {assets.map(asset => <Grid item key={asset.id}><AssetListCard onAssetSelected={() => onAdded(asset)} asset={asset} /></Grid>)}
        </Grid>
    };

    return <Dialog open={open} onClose={close} aria-labelledby="Select an asset" fullScreen>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={close} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Select an asset
                </Typography>
            </Toolbar>
        </AppBar>
        <DialogContent>
            {assets.length ? renderAssetList(assets) :
                <p className={classes.empty}>There seems to be nothing here.</p>}
        </DialogContent>
    </Dialog>
};

const Item = posed(Grid)();

const AssetSliceComponent = ({ formik: { setFieldValue }, slice, name, type, assets: assetsResult }: Props) => {
    const [selectAssetDialogOpen, setSelectAssetDialogOpen] = React.useState(false);
    const classes = useStyles();

    type amount = 'SINGLE' | 'MULTIPLE'
    const amount: amount = isImagesSlice(slice) ? 'MULTIPLE' : 'SINGLE';
    const assetIds = slice.assetIds || [];

    const addAssetToSlice = (asset: AssetWithData) => {
        const nextIdx = assetIds.length;
        setFieldValue(`${name}.assetIds[${amount === 'SINGLE' ? 0 : nextIdx}]`, asset.id);
        setSelectAssetDialogOpen(false)
    };

    if (assetsResult.loading) {
        return <Typography>Loading...</Typography>
    }

    const assets = assetsResult.assets || [];

    return <>
        <FieldArray name={`${name}.assetIds`} render={({ move, remove }) => <Grid container className={classes.assetGrid} spacing={2}>
            <PoseGroup>{assetIds.map(id => assets.find(a => a.id === id)).filter(a => a).map(asset => assetToAssetWithData(asset!)).map((asset, idx) => <Item style={{flexBasis: '345px'}} item key={asset.id}>
                <AssetListCard asset={asset} actions={<CardActions className={classes.cardActions}>
                    <Button size="small" onClick={() => idx > 0 && move(idx, idx - 1)}>Back</Button>
                    <Button size="small" onClick={() => remove(idx)}>Delete</Button>
                    <Button size="small" onClick={() => idx < assetIds.length - 1 && move(idx, idx + 1)}>Forward</Button>
                </CardActions>} />
            </Item>
            )}</PoseGroup>
        </Grid>
        } />
        <Button
            className={classes.addAssetButton}
            size="medium"
            onClick={() => setSelectAssetDialogOpen(true)}
            aria-label={`${amount === 'SINGLE' ? 'Select' : 'Add'} Asset`}
        ><AddIcon />{`${amount === 'SINGLE' ? 'Select' : 'Add'} Asset`}
        </Button>
        {selectAssetDialogOpen && <SelectAssetDialog
            open={selectAssetDialogOpen}
            close={() => setSelectAssetDialogOpen(false)}
            onAdded={addAssetToSlice}
            assets={assets.map(assetToAssetWithData).filter(a => assetIds.indexOf(a.id) === -1).filter(assetFilter(type))}
        />}
    </>
};

export default connect<ComponentProps, PostInputWithData>(
    withAssetList(AssetSliceComponent)
);