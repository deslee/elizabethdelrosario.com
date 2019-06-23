import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './pages/authRoute';
import { routeKeys, routes, RouteKey } from './pages/routes';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

export default () => {
    const [currentRoute, setCurrentRoute] = React.useState<RouteKey | undefined>();
    return <BrowserRouter>
        <Switch>
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