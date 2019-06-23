import * as React from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import { AssetWithData, getAssetType } from "../../models/AssetModel";
import * as mime from 'mime-types';
import dayjs from 'dayjs';
import CardHeader from "@material-ui/core/CardHeader";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useDialog } from "../../utils/DialogContext";
import { useSnackbar } from "notistack";
import { DeleteAssetInjectedProps, withDeleteAsset } from "../../data-access/AssetQueries";
import SimpleModal from "../SimpleModal";
import { compose } from 'recompose';

interface ComponentProps {
    asset: AssetWithData
    actions?: boolean | React.ReactNode;
    onEditClicked?: () => void
    onAssetSelected?: () => void
}

type Props = ComponentProps & DeleteAssetInjectedProps

const useStyles = makeStyles(theme => {
    const cardAttribute = {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%',
        display: 'block'
    };

    return {
        card: {
            width: 345,
        },
        cardMedia: {
            height: 150
        },
        fileName: {
            ...cardAttribute
        },
        fileType: {
            ...cardAttribute
        },
        date: {
            ...cardAttribute
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between'
        },
    }
});

const AssetListCard = ({ asset, onEditClicked = () => { }, deleteAsset, actions, onAssetSelected = () => { } }: Props) => {
    const classes = useStyles();
    const { confirmDialog } = useDialog();
    const { enqueueSnackbar } = useSnackbar();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    if (!onAssetSelected) {
        onAssetSelected = () => {
            setModalOpen(true)
        }
    }

    const assetType = getAssetType(asset.uri);
    let cardMedia = <CardHeader
        className={classes.cardMedia}
        avatar={<Avatar aria-label="Unknown">?</Avatar>}
        title={"unknown"}
    />;
    if (assetType === 'IMAGE') {
        cardMedia = <CardMedia
            className={classes.cardMedia}
            component={"img"}
            alt={asset.data.description}
            height="140"
            image={`${process.env.REACT_APP_S3_BUCKET_URL}/${asset.uri}`}
            title={asset.data.name}
        />
    }
    else if (assetType === 'VIDEO') {
        cardMedia = <CardHeader
            className={classes.cardMedia}
            avatar={<Avatar aria-label="Video">V</Avatar>}
            title={"Video"}
        />
    }
    else if (assetType === 'AUDIO') {
        cardMedia = <CardHeader
            className={classes.cardMedia}
            avatar={<Avatar aria-label="Audio">A</Avatar>}
            title={"Audio"}
        />
    }
    else if (assetType === 'PDF') {
        cardMedia = <CardHeader
            className={classes.cardMedia}
            avatar={<Avatar aria-label="Pdf">P</Avatar>}
            title={"PDF"}
        />
    }

    return <Card className={classes.card}>
        <CardActionArea onClick={() => onAssetSelected()}>
            {cardMedia}
            <CardContent>
                <Typography className={classes.fileName} variant="caption">{asset.data.name}</Typography>
                <Typography className={classes.fileType} variant="caption">{mime.lookup(asset.uri || '') || 'UNKNOWN'}</Typography>
                <Typography className={classes.date} variant="caption">{dayjs(asset.updatedAt || undefined).format('MM/DD/YYYY hh:mm:ss Z')}</Typography>
            </CardContent>
        </CardActionArea>
        {actions === true ? <CardActions className={classes.actions}>
            <Button size="small" onClick={onEditClicked}>Edit <EditIcon className={classes.rightIcon} /></Button>
            <Button size="small" color="secondary" onClick={async () => {
                if (await confirmDialog("Are you sure you want to delete this asset?")) {
                    try {
                        await deleteAsset({
                            variables: {
                                assetId: asset.id
                            }
                        });
                        enqueueSnackbar("Asset Deleted!", { variant: 'success' })
                    } catch (e) {
                        enqueueSnackbar(`Failed to delete asset: ${e.message}`, { variant: 'error' })
                    }
                }
            }}>Delete <DeleteIcon className={classes.rightIcon} /></Button>
        </CardActions> : actions && actions}
        {modalOpen && <SimpleModal asset={asset} onClose={() => setModalOpen(false)} />}
    </Card>
};

export default compose<Props, ComponentProps>(
    withDeleteAsset
)(AssetListCard);