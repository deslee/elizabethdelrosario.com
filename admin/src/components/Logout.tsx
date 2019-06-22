import * as React from 'react';
import { graphql, MutateProps, withApollo, WithApolloClient } from 'react-apollo';
import cookie from 'cookie';

import gql from "graphql-tag";
import { compose } from 'recompose';

interface ComponentProps {
    children: React.ReactNode;
}
interface Props extends WithApolloClient<ComponentProps>, MutateProps<LogoutResult> {

}

const Logout: React.FC<Props> = ({client, mutate, children}: Props) => (
    <div onClick={async _ => {
        await mutate();
        document.cookie = cookie.serialize('X-XSRF-ID', '', {
            maxAge: Date.now(),
            expires: new Date()
        });
        client.resetStore();
    }}>{children}</div>
);


interface LogoutResult {
    logout: boolean
}

export default compose<Props, ComponentProps>(
    withApollo,
    graphql<WithApolloClient<ComponentProps>, LogoutResult>(gql`
        mutation Logout {
            logout
        }
    `)
)(Logout)