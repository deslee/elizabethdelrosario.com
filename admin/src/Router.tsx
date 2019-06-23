import React from 'react';
import { RouteProps, Redirect } from 'react-router';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout/Layout';
import Loadable from 'react-loadable'
import FullPageLoading from './components/FullPageLoading';
import { makeStyles } from '@material-ui/styles';
import { GetCurrentUserVariables, WithCurrentUserInjectedProps, withCurrentUser } from './data-access/UserQueries';
import { compose } from 'recompose';

export interface RouteDefinition extends RouteProps {
    path: string,
    layout?: string,
    component: any,
    exact?: boolean,
    authorized?: boolean,
    props?: any,
    params?: Record<string, string>
}

const _routes = {
    home: {
        path: '/admin',
        component: Loadable({
            loader: () => import('./pages/DashboardPage'),
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        layout: 'Dashboard'
    },
    posts: {
        path: '/admin/posts/:id?',
        component: Loadable({
            loader: () => import('./pages/PostListingPage'),
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        props: {
            type: 'POST'
        },
        params: {
            id: ':id?'
        },
        layout: 'Posts'
    },
    pages: {
        path: '/admin/pages/:id?',
        component: Loadable({
            loader: () => import('./pages/PostListingPage'),
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        props: {
            type: 'PAGE'
        },
        params: {
            id: ':id?'
        },
        layout: 'Pages'
    },
    assets: {
        path: '/admin/assets',
        component: Loadable({
            loader: () => import('./pages/AssetsListingPage'),
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        layout: 'Assets'
    },
    settings: {
        path: '/admin/settings',
        component: Loadable({
            loader: () => import('./pages/SettingsPage'),
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        props: {},
        layout: 'Settings'
    },
    profile: {
        path: '/admin/profile',
        component: Loadable({
            loader: () => import('./pages/EditProfilePage'),
            loading: () => <FullPageLoading />
        }),
        layout: 'Profile',
        authorized: true
    }
}
export type RouteKey = keyof typeof _routes;
export const routeKeys = Object.keys(_routes) as (RouteKey)[];
export const routes = _routes as Record<RouteKey, RouteDefinition>;

const useAuthRouteStyles = makeStyles(() => ({
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
    }
}))
type AuthRouteProps = {onEnter: () => void} & RouteDefinition & GetCurrentUserVariables;
const AuthRoute = compose<AuthRouteProps & WithCurrentUserInjectedProps, AuthRouteProps>(
    withCurrentUser
)(({ authorized, onEnter, props = {}, component: Component, currentUser, ...routeProps }) => {
    const classes = useAuthRouteStyles();
    React.useEffect(() => {
        onEnter()
    }, [onEnter])

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
});

export default () => {
    const [currentRoute, setCurrentRoute] = React.useState<RouteKey | undefined>();
    return <BrowserRouter>
        <Switch>
            <Redirect from="/" to={routes.home.path} exact={true} />
            <AuthRoute authorized={false} path="/admin/login" exact={true} component={LoginPage} onEnter={() => setCurrentRoute(undefined)} />
            {
                routeKeys.filter(k => !routes[k].layout).map(routeKey => {
                    return <AuthRoute key={routeKey} {...routes[routeKey]} onEnter={() => setCurrentRoute(routeKey)} />
                })
            }
            <Route render={() => <Layout title={currentRoute ? routes[currentRoute].layout : undefined} route={currentRoute} >
                <Switch>
                    {
                        routeKeys.filter(k => routes[k].layout).map(routeKey => {
                            return <AuthRoute key={routeKey} {...routes[routeKey]} onEnter={() => setCurrentRoute(routeKey)} />
                        })
                    }
                    <Route component={NotFoundPage} />
                </Switch>
            </Layout>} />
        </Switch>
    </BrowserRouter>
}