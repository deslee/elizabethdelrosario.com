import React from 'react';
import { Route, Redirect } from 'react-router';
import { Route as RouteProps, routes } from './routes';
import { Query } from 'react-apollo';
import { GetCurrentUserResult, GetCurrentUserVariables, GET_CURRENT_USER_QUERY } from '../components/User/UserQueries';

type Props = RouteProps<React.ComponentType<any>>

export default ({ authorized, props = {}, component: Component, ...routeProps }: Props) => {
    return <Query<GetCurrentUserResult, GetCurrentUserVariables> query={GET_CURRENT_USER_QUERY}>{({ loading, data }) => {
        if (loading) {
            return <div>loading</div>
        }

        if (!authorized || (data && data.user && data.user.id)) {
            return <Route {...routeProps} render={(routeProps) => {
                return <Component {...routeProps} {...(routeProps && routeProps.match && routeProps.match.params)} {...props} />
            } } />
        }

        return <Redirect to={routes.login.path} />
    }}</Query>
}