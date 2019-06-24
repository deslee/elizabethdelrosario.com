import * as React from 'react';
import { Grid, IconButton, Collapse, Typography, Button } from '@material-ui/core';
import Paper from '../Paper';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward'
import { Slice as SliceModel, isTextSlice, isImagesSlice, isVideoSlice } from '../../models/PostModel'
import DownIcon from '@material-ui/icons/ArrowDownward'
import ImagesSlice from './ImagesSlice';
import VideoSlice from './VideoSlice';
import TextSliceComponent from './TextSlice';
import useCommonStyles from '../../utils/useCommonStyles';
import clsx from 'clsx';
import Portlet, { PortletHeader, PortletLabel, PortletContent, PortletFooter } from '../Portlet';

interface Props {
    onRemoveSlice: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    slice: SliceModel;
    name: string;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: 0,
        padding: 0,
    },
    title: {
        textTransform: 'capitalize'
    },
}))

const Slice = ({ slice, onRemoveSlice, onMoveUp, onMoveDown, name }: Props) => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();
    const [deleted, setDeleted] = React.useState(false);

    const renderSlice = () => {
        if (isTextSlice(slice)) {
            return <TextSliceComponent slice={slice} name={name} />
        } else if (isImagesSlice(slice)) {
            return <ImagesSlice slice={slice} name={name} />
        } else if (isVideoSlice(slice)) {
            return <VideoSlice slice={slice} name={name} />
        }
    };

    return <>
        <Collapse in={slice.state === 'ACTIVE' && !deleted} mountOnEnter={true} unmountOnExit={true} onExited={() => onRemoveSlice()}>
            <Portlet className={clsx(commonClasses.paper, classes.paper)}>
                <PortletHeader>
                    <PortletLabel
                        title={(slice.type && slice.type.toLowerCase()) || 'Unknown'}
                        subtitle="slice"
                    />
                    <div>
                        <Button
                            size="small"
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                                setDeleted(true);
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                        <Button variant="outlined" size="small" disabled={!onMoveUp} onClick={() => onMoveUp && onMoveUp()} >
                            <UpIcon />
                        </Button>
                        <Button variant="outlined" size="small" disabled={!onMoveDown} onClick={() => onMoveDown && onMoveDown()} >
                            <DownIcon />
                        </Button>
                    </div>
                </PortletHeader>
                <PortletContent>
                    {renderSlice()}
                </PortletContent>
            </Portlet>
        </Collapse>
    </>
}

export default Slice;