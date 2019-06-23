import React from 'react';
import PostFormComponent from './PostForm';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import { PostInputWithData, postDataToJson, PostInputWithDataShape } from '../../models/PostModel';
import { CreatePostInjectedProps, withCreatePost, POST_LIST_QUERY } from '../../data-access/PostQueries';
import { useSnackbar } from 'notistack';
import compose from 'recompose/compose';
import { routes } from '../../Router';
import { withRouting, WithRoutingInjectedProps } from '../../RouteComponents';


interface ComponentProps {
    type: 'POST' | 'PAGE';
}

type Props = ComponentProps & CreatePostInjectedProps & WithRoutingInjectedProps

const NewPost = ({ type, createPost, history }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    return <Formik<PostInputWithData>
        initialValues={{
            name: '',
            type,
            date: dayjs(new Date()).toISOString(),
            password: '',
            data: {
                title: '',
                slices: []
            }
        }}
        validationSchema={PostInputWithDataShape}
        onSubmit={async (values, actions) => {
            try {
                const result = await createPost({
                    variables: {
                        input: {
                            post: {
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
                if (result && result.errors && result.errors.length) {
                    actions.setError(result.errors.map(e => e.message).join(', '))
                }
                if (result && result.data && result.data.createPost && result.data.createPost.post && result.data.createPost.post.id) {
                    actions.resetForm();
                    if (type === 'POST') {
                        const { path, params = {} } = routes.posts;
                        history.replace(path.replace(params['id'], result.data.createPost.post.id.toString()))
                    } else {
                        const { path, params = {} } = routes.pages;
                        history.replace(path.replace(params['id'], result.data.createPost.post.id.toString()))
                    }
                }
                enqueueSnackbar('Success!', {
                    variant: 'success'
                })
            } catch (e) {
                actions.setError(e.message);
            } finally {
                actions.setSubmitting(false);
            }
        }}
        render={props => <PostFormComponent {...props} type={type} />}
    />
}

export default compose<Props, ComponentProps>(
    withRouting,
    withCreatePost,
)(NewPost);