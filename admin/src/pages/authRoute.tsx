import React from 'react';
import { Route, Redirect } from 'react-router';
import { Route as RouteProps } from './routes';
import { WithCurrentUserInjectedProps, withCurrentUser, GetCurrentUserVariables } from '../components/User/UserQueries';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FullPageLoading from '../components/FullPageLoading'
import { compose } from 'recompose';

interface ComponentProps extends RouteProps, GetCurrentUserVariables {
    onEnter: () => void
}

type Props = ComponentProps & WithCurrentUserInjectedProps

const useStyles = makeStyles(() => ({
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
    }
}))

const AuthRoute = ({ authorized, onEnter, props = {}, component: Component, currentUser, ...routeProps }: Props) => {
    const classes = useStyles();
    React.useEffect(() => {
        onEnter()
    }, [])

    if (currentUser.loading && authorized) {
        return <div className={classes.loading}><FullPageLoading /></div>
    }
    else if (!currentUser.loading && authorized && (!currentUser.user || !currentUser.user.id)) {
        return <Redirect to="/admin/login" />
    }
    else {
        return <Route {...routeProps} render={(routeProps) => {
            return <Component {...routeProps} {...(routeProps && routeProps.match && routeProps.match.params)} {...props} />;
        } } />
    }
};

export default compose<Props, ComponentProps>(
    withCurrentUser
)(AuthRoute);