import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import PostFormComponent from './PostForm';
import { PostInputWithData, jsonToPostData, postDataToJson, PostInputWithDataShape as PostInputWithDataShape } from './PostData';
import { compose } from 'recompose';
import dayjs from 'dayjs';
import { withUpdatePost, UpdatePostInjectedProps, GET_POST_QUERY, GetPostResult, GetPostVariables, POST_LIST_QUERY, withDeletePost, DeletePostInjectedProps } from './PostQueries';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { withRouter, RouteComponentProps } from 'react-router';

interface ComponentProps {
    postId: number;
    type: string;
    children?: React.ReactNode;
}

type Props = WithApolloClient<ComponentProps> & UpdatePostInjectedProps & DeletePostInjectedProps & RouteComponentProps

const useStyles = makeStyles(theme => ({
}))

const EditPost = ({ postId, mutate, type, deletePost, client, history }: Props) => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    return <Query<GetPostResult, GetPostVariables> query={GET_POST_QUERY} variables={{ postId }}>{({ loading, data }) => {
        return !loading && data && data.post && <Formik<PostInputWithData>
        enableReinitialize={true}
        validationSchema={PostInputWithDataShape}
        initialValues={{
            name: data.post.name,
            type,
            date: dayjs(data.post.date || undefined).toISOString(),
            password: data.post.password || '',
            data: jsonToPostData(data.post.data)
        }}
        onSubmit={async (values, actions) => {
            try {
                const result = await mutate({
                    variables: {
                        input: {
                            id: postId,
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
            } catch(error) {
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
                    refetchQueries: [{query: POST_LIST_QUERY, variables: {type}}]
                });
                if (result && result.errors && result.errors.length) {
                    props.setError(result.errors.map(e => e.message).join(', '))
                } else {
                    props.resetForm();
                    history.push('/posts')
                }
            } catch(error) {
                enqueueSnackbar(error.message, {
                    variant: 'error'
                })
            } finally {
                props.setSubmitting(false);
            }
        }} />}
    />
    }}</Query>
}

export default compose<Props, ComponentProps>(
    withRouter,
    withDeletePost<ComponentProps>(),
    withUpdatePost<ComponentProps>(),
    withApollo
)(EditPost)