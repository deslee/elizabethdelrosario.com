import React from 'react'
import Layout from '../components/Layout';
import PostList from '../components/Post/PostList';
import { Grid, withStyles, WithStyles, Fab, makeStyles } from '@material-ui/core';
import constants from '../Constants';
import AddIcon from '@material-ui/icons/Add';
import NewPost from '../components/Post/NewPost';
import EditPost from '../components/Post/EditPost';

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
    },
    addPostFab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}))

export default ({ id: postId, type }: Props) => {
    const classes = useStyles();
    return <Layout title={type === 'POST' ? 'Posts' : 'Pages'}>
        <Grid container direction="row" className={classes.container}>
            <Grid item className={classes.list} sm={12} md={6} lg={4} xl={3}>
                {/* <PostList type={type} selected={parseInt(postId) !== NaN && parseInt(postId)} />
                <Link href={`/posts?postId=new&type=${type}`} as={`/${type.toLowerCase()}s/new`}>
                    <Fab color="secondary" aria-label="Add" className={classes.addPostFab} component="a" href={`/${type.toLowerCase()}s/new`}>
                        <AddIcon />
                    </Fab>
                </Link> */}
            </Grid>
            <Grid item className={classes.content} xs={12} md={6} lg={8} xl={9}>
                {postId === 'new' ? <NewPost type={type} /> : (postId && parseInt(postId) !== NaN && <EditPost postId={parseInt(postId)} type={type} />)}
            </Grid>
        </Grid>
    </Layout>
}