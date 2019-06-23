import React from 'react'
import PostList from '../components/Post/PostList';
import { Grid, Fab, makeStyles } from '@material-ui/core';
import constants from '../Constants';
import AddIcon from '@material-ui/icons/Add';
import NewPost from '../components/Post/NewPost';
import EditPost from '../components/Post/EditPost';
import {routes} from './routes'
import { Link as RouterLink } from "react-router-dom";
import clsx from 'clsx';

interface ComponentProps {
    id?: string
    type: 'POST' | 'PAGE'
}

type Props = ComponentProps;

const useStyles = makeStyles(theme => ({
    container: {
        height: `calc(100vh - ${constants.appBarHeight}px)`,
        width: '100%',
        overflow: 'hidden',
    },
    list: {
        height: '100%',
        overflowY: 'auto',
        position: 'relative'
    },
    content: {
        height: '100%',
        overflow: 'auto',
        position: 'relative'
    },
    contentWithPost: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    addPostFab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}))

export default ({ id: postId, type }: Props) => {
    const classes = useStyles();

    const { path, params } = (type === 'POST' ? routes.posts : routes.pages);
    const newPostUrl = path.replace(params!.id, 'new');

    return <Grid container direction="row" className={classes.container}>
        <Grid item className={clsx(classes.content, postId && classes.contentWithPost)} xs={12} lg={5} xl={3}>
            <PostList type={type} selected={postId && parseInt(postId) !== NaN ? parseInt(postId) : undefined} />
            <Fab color="secondary" aria-label="Add" className={classes.addPostFab} component={RouterLink} to={newPostUrl}>
                <AddIcon />
            </Fab>
        </Grid>
        {postId && <Grid item className={clsx(classes.content)} xs={12} lg={7} xl={9}>
            {postId === 'new' ? <NewPost type={type} /> : (postId && parseInt(postId) !== NaN && <EditPost postId={parseInt(postId)} type={type} />)}
        </Grid>}
    </Grid>
}