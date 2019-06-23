import * as React from 'react';
import { Link as RouterLink } from "../../RouteComponents";
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import { Grid, List, ListItem, Divider, Typography } from '@material-ui/core';
import { PostWithData, jsonToPostData } from '../../models/PostModel';
import { GetPostListVariables, WithPostListInjectedProps, withPostList } from '../../data-access/PostQueries';
import { routes } from '../../Router';
import Skeleton from 'react-loading-skeleton';
import { compose } from 'recompose';

interface ComponentProps extends GetPostListVariables {
    selected?: number
}

type Props = ComponentProps & WithPostListInjectedProps


const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'auto',
        height: '100%',
        width: '100%'
    },
    list: {

    },
    loadingSkeleton: {
        margin: theme.spacing(0, 2)
    },
    row: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    noPostsMessage: {
        textAlign: 'center',
        padding: theme.spacing(3)
    }
}));

const PostList = ({ type, selected, posts }: Props) => {
    const classes = useStyles({});

    const postList = (posts && posts.posts || []);
    const loading = posts.loading;
    return <Paper className={classes.root}>
        <List>
            <ListItem>
                <Grid container>
                    <Grid container item xs>Title</Grid>
                    <Grid container item xs={3}>Date</Grid>
                </Grid>
            </ListItem>
        </List>
        <Divider />
        <List className={classes.list}>
            {loading && <div className={classes.loadingSkeleton}><Skeleton count={2} /></div>}
            {!loading && postList.length === 0 && <Typography className={classes.noPostsMessage}>There seems to be nothing here</Typography>}
            {!loading && postList.map(p => ({ ...p, data: jsonToPostData(p.data) } as PostWithData)).map((post, i) => <React.Fragment key={post.id}>
                <ListItem button component={RouterLink} to={type === 'POST' ? routes.posts.path.replace(routes.posts.params!.id, post.id.toString()) : routes.pages.path.replace(routes.pages.params!.id, post.id.toString())} selected={post.id === selected}>
                    <Grid container className={classes.row}>
                        <Grid container item xs>{post.data.title}</Grid>
                        <Grid container item xs={3}>{dayjs(post.date || undefined).format('MM/DD/YYYY')}</Grid>
                    </Grid>
                </ListItem>
                {i !== postList.length - 1 && <Divider />}
            </React.Fragment>)}
        </List>
    </Paper>
}
export default compose<Props, ComponentProps>(
    withPostList
)(PostList);