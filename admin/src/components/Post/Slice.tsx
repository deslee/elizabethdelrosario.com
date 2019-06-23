import * as React from 'react';
import { Paper, Grid, IconButton, Collapse, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward'
import { Slice as SliceModel, isTextSlice, isImagesSlice, isVideoSlice } from './PostData'
import DownIcon from '@material-ui/icons/ArrowDownward'
import ImagesSlice from './ImagesSlice';
import VideoSlice from './VideoSlice';
import TextSliceComponent from './TextSlice';
import useCommonStyles from '../../utils/useCommonStyles';
import clsx from 'clsx';

interface Props {
    onRemoveSlice: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    slice: SliceModel;
    name: string;
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative'
    },
    toolBar: {
        textAlign: 'right',
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2)
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
            <Paper className={clsx(commonClasses.innerPaper, classes.paper)} elevation={1}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.title}>{slice.type && slice.type.toLowerCase()}</Typography>
                        <div className={classes.toolBar}>
                            <IconButton 
                                size="small" 
                                color="secondary" 
                                onClick={() => {
                                    setDeleted(true);
                                }} 
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton size="small" disabled={!onMoveUp} onClick={() => onMoveUp && onMoveUp()} >
                                <UpIcon />
                            </IconButton><br />
                            <IconButton size="small" disabled={!onMoveDown} onClick={() => onMoveDown && onMoveDown()} >
                                <DownIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlice()}
                    </Grid>
                </Grid>
            </Paper>
        </Collapse>
    </>
}

export default Slice;