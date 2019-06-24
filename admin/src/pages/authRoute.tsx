import React from 'react';
import { Route, Redirect } from 'react-router';
import { RouteDefinition } from '../Router';
import { WithCurrentUserInjectedProps, withCurrentUser, GetCurrentUserVariables } from '../data-access/UserQueries';
import { makeStyles } from '@material-ui/styles';
import FullPageLoading from '../components/FullPageLoading'
import { compose } from 'recompose';

interface ComponentProps extends RouteDefinition, GetCurrentUserVariables {
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
        return <div className={classes.loading}></div>
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