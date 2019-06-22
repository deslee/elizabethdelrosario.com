import React from 'react';
import PostFormComponent from './PostForm';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import { PostInputWithData, postDataToJson, PostInputWithDataShape } from './PostData';
import { CreatePostInjectedProps, withCreatePost, POST_LIST_QUERY } from './PostQueries';
import { useSnackbar } from 'notistack';
import compose from 'recompose/compose';
import { RouteComponentProps, withRouter } from 'react-router';


interface ComponentProps {
    type: string;
}

type Props = ComponentProps & CreatePostInjectedProps & RouteComponentProps

const NewPost = ({ type, mutate, history }: Props) => {
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
                const result = await mutate({
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
                    history.push(`/${type.toLowerCase()}s/${result.data.createPost.post.id}`)
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
    withRouter,
    withCreatePost<ComponentProps>()
)(NewPost);