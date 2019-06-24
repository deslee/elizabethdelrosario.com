import React from 'react'
import PostList from '../components/Post/PostList';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewPost from '../components/Post/NewPost';
import EditPost from '../components/Post/EditPost';
import {routes} from '../Router'
import clsx from 'clsx';

interface ComponentProps {
    id?: string
    type: 'POST' | 'PAGE'
}

type Props = ComponentProps;

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
    },
    list: {
    },
    content: {
        position: 'relative'
    },
    contentWithPost: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    }
}))

export default ({ id: postId, type }: Props) => {
    const classes = useStyles();

    return <Grid container direction="row" className={classes.root}>
        <Grid item className={clsx(classes.content, postId && classes.contentWithPost)} xs={12} lg={5} xl={3}>
            <PostList type={type} selected={postId && !isNaN(parseInt(postId)) ? parseInt(postId) : undefined} />
        </Grid>
        {postId && <Grid item className={clsx(classes.content)} xs={12} lg={7} xl={9}>
            {postId === 'new' ? <NewPost type={type} /> : (postId && !isNaN(parseInt(postId)) && <EditPost postId={parseInt(postId)} type={type} />)}
        </Grid>}
    </Grid>
}