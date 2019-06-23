import * as React from 'react';
import { Formik } from 'formik';
import PostFormComponent from './PostForm';
import { PostInputWithData, jsonToPostData, PostInputWithDataShape } from '../../models/PostModel';
import { compose } from 'recompose';
import dayjs from 'dayjs';
import { withUpdatePost, UpdatePostInjectedProps, withDeletePost, DeletePostInjectedProps, withPost, WithPostInjectedProps, GetPostVariables, POST_LIST_QUERY } from '../../data-access/PostQueries';
import { withApollo, WithApolloClient } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { routes } from '../../Router';
import Skeleton from 'react-loading-skeleton';
import { Paper } from '@material-ui/core';
import useCommonStyles from '../../utils/useCommonStyles';
import { withRouting, WithRoutingInjectedProps } from '../../RouteComponents';

interface ComponentProps extends GetPostVariables {
    type: 'POST' | 'PAGE';
    children?: React.ReactNode;
}

type Props = WithApolloClient<ComponentProps> & UpdatePostInjectedProps & DeletePostInjectedProps & WithRoutingInjectedProps & WithPostInjectedProps


const EditPost = ({ type, deletePost, post, history }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    if (post.loading || !post.post) {
        return <SkeletonLoading />
    }

    return <Formik<PostInputWithData>
        enableReinitialize={true}
        validationSchema={PostInputWithDataShape}
        initialValues={{
            name: post.post.name,
            type,
            date: dayjs(post.post.date || undefined).toISOString(),
            password: post.post.password || '',
            data: jsonToPostData(post.post.data)
        }}
        onSubmit={async (values, actions) => {
            try {
                enqueueSnackbar('Success!', {
                    variant: 'success'
                })
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: 'error'
                })
            } finally {
                actions.setSubmitting(false);
            }
        }}
        render={props => <PostFormComponent {...props} type={type} onDelete={async () => {
            try {
                props.setSubmitting(true);
                const result = await deletePost({
                    refetchQueries: [{ query: POST_LIST_QUERY, variables: { type } }]
                });
                if (result && result.errors && result.errors.length) {
                    props.setError(result.errors.map(e => e.message).join(', '))
                } else {
                    props.resetForm();
                    if (type === 'POST') {
                        history.push(routes.posts.path.replace(routes.posts.params!.id, ''))
                    } else {
                        history.push(routes.pages.path.replace(routes.pages.params!.id, ''))
                    }
                }
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: 'error'
                })
            } finally {
                props.setSubmitting(false);
            }
        }} />}
    />
}

export default compose<Props, ComponentProps>(
    withRouting,
    withPost,
    withDeletePost,
    withUpdatePost,
    withApollo
)(EditPost)

const SkeletonLoading = () => {
    const commonClasses = useCommonStyles();
    return <Paper className={commonClasses.paper}>
        <Skeleton count={5} />
    </Paper>
}