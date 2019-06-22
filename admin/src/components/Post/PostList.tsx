import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import { Grid, List, ListItem, Divider, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import { PostWithData, jsonToPostData } from './PostData';
import {POST_LIST_QUERY, GetPostListVariables, GetPostListResult} from './PostQueries';

interface ComponentProps {
    type: string
    selected?: number
}

interface Props extends ComponentProps {
}


const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'auto',
        height: '100%'
    },
    row: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    noPostsMessage: {
        textAlign: 'center',
        paddingTop: theme.spacing(2)
    }
}));

const PostList = ({ type, selected }: Props) => {
    const classes = useStyles({});

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
        <Query<GetPostListResult, GetPostListVariables> query={POST_LIST_QUERY} variables={{ type }}>{({ data }) => {
            const posts = (data && data.posts || [])
            return <List>
                {posts.length === 0 && <Typography className={classes.noPostsMessage}>There seems to be nothing here</Typography>}
                {posts.map(p => ({ ...p, data: jsonToPostData(p.data) } as PostWithData)).map((post, i) => <React.Fragment key={post.id}>
                    <ListItem button component={RouterLink} to={`/${type.toLowerCase()}s/${post.id}`} selected={post.id === selected}>
                        <Grid container className={classes.row}>
                            <Grid container item xs>{post.data.title}</Grid>
                            <Grid container item xs={3}>{dayjs(post.date || undefined).format('MM/DD/YYYY')}</Grid>
                        </Grid>
                    </ListItem>
                    {i !== posts.length - 1 && <Divider />}
                </React.Fragment>)}
            </List>
        }}</Query>
    </Paper>
}
export default PostList;