import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import PostFormComponent from './PostForm';
import { PostInputWithData, jsonToPostData, postDataToJson, PostInputWithDataShape as PostInputWithDataShape } from './PostData';
import { compose } from 'recompose';
import dayjs from 'dayjs';
import { withUpdatePost, UpdatePostInjectedProps, withDeletePost, DeletePostInjectedProps, withPost, WithPostInjectedProps, GetPostVariables, POST_LIST_QUERY } from './PostQueries';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { withRouter, RouteComponentProps } from 'react-router';
import { routes } from '../../pages/routes';
import Skeleton from 'react-loading-skeleton';
import { Paper } from '@material-ui/core';
import useCommonStyles from '../../utils/useCommonStyles';

interface ComponentProps extends GetPostVariables {
    type: 'POST' | 'PAGE';
    children?: React.ReactNode;
}

type Props = WithApolloClient<ComponentProps> & UpdatePostInjectedProps & DeletePostInjectedProps & RouteComponentProps & WithPostInjectedProps

const useStyles = makeStyles(theme => ({
}))

const EditPost = ({ updatePost, type, deletePost, post, history }: Props) => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
                const result = await updatePost({
                    variables: {
                        input: {
                            id: post.post!.id,
                            patch: {
                                ...values,
                                data: postDataToJson(values.data)
                            }
                        }
                    },
                    refetchQueries: [{
                        query: POST_LIST_QUERY,
                        variables: {
                            type
                        }
                    }]
                });
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
    withRouter,
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