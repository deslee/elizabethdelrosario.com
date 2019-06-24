import React from 'react';
import FilePicker from "../FilePicker";
import {
    CreateAssetInjectedProps,
    CreateAssetVariables,
    withCreateAsset,
    ASSET_LIST_QUERY,
    withAssetList,
    AssetListInjectedProps
} from "../../data-access/AssetQueries";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "../Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import { assetDataToJson, assetFilter, AssetWithData, getAssetType, jsonToAssetData } from "../../models/AssetModel";
import AssetListCard from "./AssetListCard";
import { Grid } from "@material-ui/core";
import posed, { PoseGroup } from 'react-pose';
import { EditAssetDialog } from "./EditAssetForm";
import Lightbox from '../Lightbox';
import SimpleModal from "../SimpleModal";
import useCommonStyles from '../../utils/useCommonStyles';
import clsx from 'clsx';
import { compose } from 'recompose';

const Item = posed(Grid)();

interface ComponentProps {

}

type Props = ComponentProps & CreateAssetInjectedProps & AssetListInjectedProps

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%'
    },
    uploadButton: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginBottom: theme.spacing(2)
    },
    item: {
        flexBasis: '350px'
    },
    container: {

    },
    empty: {
    }
}));

const AssetList = ({ createAsset, assets: assetListResult }: Props) => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();
    const [assetEditing, setAssetEditing] = React.useState<AssetWithData | undefined>(undefined);
    const [uploadAssetState, setUploadAssetState] = React.useState<['NONE' | 'UPLOADING' | 'UPLOADED' | 'ERROR', string?]>(['NONE']);
    const [assetViewing, setAssetViewing] = React.useState<AssetWithData | undefined>(undefined);

    const handleFilePicked = async (files: FileList | null) => {
        const file = (files && files.length > 0) ? files[0] : undefined;
        if (!file) {
            return;
        }
        const variables: CreateAssetVariables = {
            input: {
                asset: {
                    state: 'CREATED',
                    data: assetDataToJson({ name: file.name, fileName: file.name, privateNotes: '' }),
                    uri: file as any
                }
            }
        };
        setUploadAssetState(['UPLOADING', '0']);
        try {
            const response = await createAsset({
                variables,
                refetchQueries: [
                    {
                        query: ASSET_LIST_QUERY
                    }
                ],
                context: {
                    fetchOptions: {
                        useUpload: true,
                        onProgress: (ev: ProgressEvent) => {
                            setUploadAssetState(['UPLOADING', (ev.loaded / ev.total * 100).toString()]);
                        }
                    }
                }
            });
            if (response && response.data && response.data.createAsset) {
                setUploadAssetState(['UPLOADED', response.data.createAsset.asset ? (response.data.createAsset.asset.uri || undefined) : undefined]);
            } else {
                setUploadAssetState(['ERROR'])
            }
        } catch (e) {
            setUploadAssetState(['ERROR'])
        }
    };

    const renderAssetList = (assets: AssetWithData[]) => {
        const images = assets.filter(assetFilter('IMAGE'));

        return <Grid container spacing={2}>
            <PoseGroup>
                {assets.map(asset => <Item key={asset.id} item className={classes.item}>
                    <AssetListCard actions={true} onEditClicked={() => setAssetEditing(asset)} onAssetSelected={() => {
                        setAssetViewing(asset)
                    }} asset={asset} />
                </Item>)}
            </PoseGroup>
            {assetViewing !== undefined && getAssetType(assetViewing.uri) === 'IMAGE' && <Lightbox
                open={true}
                initialIndex={images.map(a => a.id).indexOf(assetViewing.id)}
                images={images.map(asset => ({ url: `${process.env.REACT_APP_S3_BUCKET_URL}/${asset.uri}`, alt: asset.data.description || '' }))}
                onClose={() => setAssetViewing(undefined)}
            />}
            {assetViewing !== undefined && ['AUDIO', 'VIDEO'].indexOf(getAssetType(assetViewing.uri)) !== -1 && <SimpleModal asset={assetViewing} onClose={() => setAssetViewing(undefined)} />}
        </Grid>
    };

    const assets = (assetListResult.assets || []);
    const loading = assetListResult.loading

    return <>
        <div className={clsx(commonClasses.paper, classes.paper)}>
            <FilePicker className={classes.uploadButton} variant="contained" color="primary" handleFilePicked={handleFilePicked}>Upload</FilePicker>
            {uploadAssetState[0] === 'UPLOADING' && <LinearProgress variant="determinate" value={parseInt(uploadAssetState[1] as string)} />}
            <Divider className={classes.divider} />
            {loading ? <p>Loading</p> : assets.length ? renderAssetList(assets.map(asset => ({ ...asset, data: jsonToAssetData(asset.data) }))) : <p className={classes.empty}>There seems to be nothing here.</p>}
        </div>
        <EditAssetDialog assetEditing={assetEditing} onClose={() => setAssetEditing(undefined)} />
    </>
};

export default compose<Props, ComponentProps>(
    withCreateAsset,
    withAssetList
)(AssetList)