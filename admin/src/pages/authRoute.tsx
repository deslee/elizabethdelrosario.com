import React from 'react';
import { Route, Redirect } from 'react-router';
import { Route as RouteProps, routes } from './routes';
import { Query } from 'react-apollo';
import { GetCurrentUserResult, GetCurrentUserVariables, GET_CURRENT_USER_QUERY } from '../components/User/UserQueries';
import Layout from '../components/Layout';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FullPageLoading from '../components/FullPageLoading'

interface ComponentProps {
    layout?: string
}

type Props = RouteProps & ComponentProps

const useStyles = makeStyles((theme: Theme) => ({
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
    }
}))

export default ({ authorized, layout, props = {}, component: Component, ...routeProps }: Props) => {
    const classes = useStyles();
    return <Query<GetCurrentUserResult, GetCurrentUserVariables> query={GET_CURRENT_USER_QUERY}>{({ loading, data }) => {
        if (loading) {
            return <div className={classes.loading}><FullPageLoading /></div>
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