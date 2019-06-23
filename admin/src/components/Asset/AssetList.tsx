import React from 'react';
import FilePicker from "../FilePicker";
import {
    ASSET_LIST_QUERY,
    CreateAssetInjectedProps, 
    CreateAssetVariables,
    GetAssetListResult,
    GetAssetListVariables,
    withCreateAsset
} from "./AssetQueries";
import {Query} from "react-apollo";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import {assetDataToJson, assetFilter, AssetWithData, getAssetType, jsonToAssetData} from "./AssetData";
import AssetListCard from "./AssetListCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import posed, { PoseGroup } from 'react-pose';
import {EditAssetDialog} from "./EditAssetForm";
import Lightbox from '../Lightbox';
import SimpleModal from "../SimpleModal";

const Item = posed(Grid)();

interface ComponentProps {

}

interface Props extends ComponentProps, CreateAssetInjectedProps {

}

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4),
        display: 'inline-block'
    },
    uploadButton: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginBottom: theme.spacing(2)
    },
    container: {

    },
    empty: {
    }
}));

const AssetList = ({ createAsset }: Props) => {
    const classes = useStyles();
    const [assetEditing, setAssetEditing] = React.useState<AssetWithData|undefined>(undefined);
    const [uploadAssetState, setUploadAssetState] = React.useState<['NONE'|'UPLOADING'|'UPLOADED'|'ERROR', string?]>(['NONE']);
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
                    data: assetDataToJson({name: file.name, fileName: file.name, privateNotes: ''}),
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
                setUploadAssetState(['UPLOADED', response.data.createAsset.asset && response.data.createAsset.asset.uri || undefined]);
            } else {
                setUploadAssetState(['ERROR'])
            }
        } catch(e) {
            setUploadAssetState(['ERROR'])
        }
    };

    const renderAssetList = (assets: AssetWithData[]) => {
        const images = assets.filter(assetFilter('IMAGE'));

        return <Grid container spacing={2}>
            <PoseGroup>
                {assets.map(asset => <Item key={asset.id} item>
                    <AssetListCard actions={true} onEditClicked={() => setAssetEditing(asset)} onAssetSelected={() => {
                        setAssetViewing(asset)
                    }} asset={asset} />
                </Item>)}
            </PoseGroup>
            {assetViewing !== undefined && getAssetType(assetViewing.uri) === 'IMAGE' && <Lightbox
                open={true}
                initialIndex={images.map(a => a.id).indexOf(assetViewing.id)}
                images={images.map(asset => ({url: `${process.env.REACT_APP_S3_BUCKET_URL}/${asset.uri}`, alt: asset.data.description || ''}))}
                onClose={() => setAssetViewing(undefined)}
            />}
            {assetViewing !== undefined && ['AUDIO', 'VIDEO'].indexOf(getAssetType(assetViewing.uri)) !== -1 && <SimpleModal asset={assetViewing} onClose={() => setAssetViewing(undefined)} />}
        </Grid>
    };

    return <Container className={classes.container}>
        <Paper className={classes.paper}>
            <FilePicker className={classes.uploadButton} variant="contained" color="primary" handleFilePicked={handleFilePicked}>Upload</FilePicker>
            {uploadAssetState[0] === 'UPLOADING' &&  <LinearProgress variant="determinate"  value={parseInt(uploadAssetState[1] as string)} />}
            <Divider className={classes.divider} />
            <Query<GetAssetListResult, GetAssetListVariables> query={ASSET_LIST_QUERY}>{({loading, data}) => {
                const assets = (data && data.assets || []);
                return loading ? <p>Loading</p> : assets.length ? renderAssetList(assets.map(asset => ({ ...asset, data: jsonToAssetData(asset.data) }))) : <p className={classes.empty}>There seems to be nothing here.</p>
            }}</Query>
        </Paper>
        <EditAssetDialog assetEditing={assetEditing} onClose={() => setAssetEditing(undefined)} />
    </Container>
};

export default withCreateAsset<ComponentProps>()(AssetList);
