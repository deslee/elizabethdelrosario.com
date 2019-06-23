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
    onEnter: () => void
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

export default ({ authorized, onEnter, props = {}, component: Component, ...routeProps }: Props) => {
    const classes = useStyles();
    React.useEffect(() => {
        onEnter()
    }, [])
    return <Query<GetCurrentUserResult, GetCurrentUserVariables> query={GET_CURRENT_USER_QUERY}>{({ loading, data }) => {
        if (loading) {
            return <div className={classes.loading}><FullPageLoading /></div>
        }

        if (!authorized || (data && data.user && data.user.id)) {
            return <Route {...routeProps} render={(routeProps) => {
                return <Component {...routeProps} {...(routeProps && routeProps.match && routeProps.match.params)} {...props} />;
            } } />
        }

        return <Redirect to="/admin/login" />
    }}</Query>
}