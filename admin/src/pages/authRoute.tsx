import React from 'react';
import { Route, Redirect } from 'react-router';
import { Route as RouteProps, routes } from './routes';
import { Query } from 'react-apollo';
import { GetCurrentUserResult, GetCurrentUserVariables, GET_CURRENT_USER_QUERY } from '../components/User/UserQueries';
import Layout from '../components/Layout';

interface ComponentProps {
    layout?: string
}

type Props = RouteProps & ComponentProps

export default ({ authorized, layout, props = {}, component: Component, ...routeProps }: Props) => {
    return <Query<GetCurrentUserResult, GetCurrentUserVariables> query={GET_CURRENT_USER_QUERY}>{({ loading, data }) => {
        if (loading) {
            return <div>loading</div>
        }

        if (!authorized || (data && data.user && data.user.id)) {
            return <Route {...routeProps} render={(routeProps) => {
                const component = <Component {...routeProps} {...(routeProps && routeProps.match && routeProps.match.params)} {...props} />;
                if (layout) {
                    return <Layout title={layout}>{component}</Layout>
                } else {
                    return component
                }
            } } />
        }

        return <Redirect to="/admin/login" />
    }}</Query>
}