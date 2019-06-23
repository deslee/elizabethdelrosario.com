import { graphql, MutationFn, DataValue } from 'react-apollo';
import { UpdatePostInput, UpdatePostPayload, CreatePostInput, CreatePostPayload, Post } from 'api';
import gql from "graphql-tag";

const PostFragment = gql`
fragment postFragment on Post {
  nodeId
  id
  name
  type
  date
  data
  password
  createdBy
  createdAt
  updatedBy
  updatedAt
}
`

export type UpdatePostVariables = { input: UpdatePostInput }
export type UpdatePostResult = { updatePost: UpdatePostPayload }
export type UpdatePostInjectedProps = { updatePost: MutationFn<UpdatePostResult, UpdatePostVariables> };
const UPDATE_POST_MUTATION = gql`
mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    post {
      ...postFragment
    }
  }
}
${PostFragment}`
export const withUpdatePost = graphql<any, UpdatePostResult, UpdatePostVariables, UpdatePostInjectedProps>(
  UPDATE_POST_MUTATION,
  {
    props: props => ({ updatePost: props.mutate! })
  }
)


export type CreatePostVariables = { input: CreatePostInput }
export type CreatePostResult = { createPost: CreatePostPayload }
export type CreatePostInjectedProps = { createPost: MutationFn<CreatePostResult, CreatePostVariables> };
const CREATE_POST_MUTATION = gql`
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      ...postFragment
    }
  }
}
${PostFragment}
`;
export const withCreatePost = graphql<any, CreatePostResult, CreatePostVariables, CreatePostInjectedProps>(
  CREATE_POST_MUTATION,
  {
    props: props => ({ createPost: props.mutate! })
  }
)


export type DeletePostVariables = { postId: number }
export type DeletePostResult = {}
export type DeletePostInjectedProps = { deletePost: MutationFn<DeletePostResult, DeletePostVariables> };
const DELETE_POST_MUTATION = gql`
mutation DeletePost($postId: Int!) {
  deletePost(input: {id: $postId}) {
    clientMutationId
  }
}
`
export const withDeletePost = graphql<any, DeletePostResult, DeletePostVariables, DeletePostInjectedProps>(DELETE_POST_MUTATION, { props: (props) => ({ deletePost: props.mutate! }) });

export type GetPostVariables = { postId: number }
export type GetPostResult = { post: Post }
export type WithPostInjectedProps = { post: DataValue<GetPostResult, GetPostVariables> }
const GET_POST_QUERY = gql`
  query PostById($postId: Int!) {
    post(id: $postId) {
      ...postFragment
    }
  }
  ${PostFragment}
`
export const withPost = graphql<any, GetPostResult, GetPostVariables, WithPostInjectedProps>(
  GET_POST_QUERY,
  {
      props: props => ({ post: props.data! })
  }
)

export type GetPostListVariables = { type: 'POST' | 'PAGE' }
export type GetPostListResult = { posts: Post[] }
export type WithPostListInjectedProps = { posts: DataValue<GetPostListResult, GetPostListVariables> }
export const POST_LIST_QUERY = gql`
query Posts($type: String) {
  posts(condition: { type: $type }, orderBy: [DATE_DESC]) {
    ...postFragment
  }
}
${PostFragment}
`
export const withPostList = graphql<any, GetPostListResult, GetPostListVariables, WithPostListInjectedProps>(
  POST_LIST_QUERY,
  {
      props: props => ({ posts: props.data! })
  }
)