import gql from "graphql-tag";
import {UpdateUserInput, UpdateUserPayload, User} from "api";
import { MutationFn, graphql, DataValue } from "react-apollo";

export const UserFragment = gql`
fragment userFragment on User {
    nodeId
    id
    email
    data
    createdBy
    updatedBy
    createdAt
    updatedAt
  }
`

export const GET_CURRENT_USER_QUERY = gql`
query GetCurrentUser {
    user: me {
        ...userFragment
    }
}
${UserFragment}
`;
export type GetCurrentUserVariables = {}
export type GetCurrentUserResult = { user: User }
export type WithCurrentUserInjectedProps = { currentUser: DataValue<GetCurrentUserResult, GetCurrentUserVariables> }
export const withCurrentUser = graphql<any, GetCurrentUserResult, GetCurrentUserVariables, WithCurrentUserInjectedProps>(
    GET_CURRENT_USER_QUERY,
    {
        props: props => ({ currentUser: props.data! })
    }
)


export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            user {
                ...userFragment
            }
        }
    }
    ${UserFragment}
`;
export type UpdateUserResult = { updateUser: UpdateUserPayload }
export type UpdateUserVariables = { input: UpdateUserInput }
export type UpdateUserInjectedProps = { updateUser: MutationFn<UpdateUserResult, UpdateUserVariables> };
export const withUpdateUser = graphql<any, UpdateUserResult, UpdateUserVariables, UpdateUserInjectedProps>(
    UPDATE_USER_MUTATION,
    {
        props: props => ({ updateUser: props.mutate! })
    }
);