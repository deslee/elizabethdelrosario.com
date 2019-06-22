import DashboardPage from './DashboardPage'
import LoginPage from './LoginPage'
import SettingsPage from './SettingsPage'
import PostListingPage from './PostListingPage'
import AssetsListingPage from './AssetsListingPage'
import { RouteProps } from 'react-router';
import { ElementType } from 'react';

export interface Route<Component extends React.ComponentType<any>> extends RouteProps {
    path: string,
    component: Component,
    exact?: boolean,
    authorized?: boolean,
    props?: Partial<React.ComponentProps<Component>>
}

const _routes = {
    home: {
        path: '/',
        component: DashboardPage,
        exact: true,
        authorized: true
    },
    posts: {
        path: '/posts/:id?',
        component: PostListingPage,
        exact: true,
        authorized: true,
        props: {
            type: 'POST'
        },
        params: {
            postId: ':id?'
        }
    } as Route<typeof PostListingPage>,
    pages: {
        path: '/pages/:id?',
        component: PostListingPage,
        exact: true,
        authorized: true,
        props: {
            type: 'PAGE'
        },
        params: {
            pageId: ':id?'
        }
    } as Route<typeof PostListingPage>,
    assets: {
        path: '/assets',
        component: AssetsListingPage,
        exact: true,
        authorized: true,
    } as Route<typeof AssetsListingPage>,
    settings: {
        path: '/settings',
        component: SettingsPage,
        exact: true,
        authorized: true,
        props: {}
    } as Route<typeof SettingsPage>,
    login: {
        path: '/login',
        component: LoginPage,
        exact: true
    }
}
export const routeKeys = Object.keys(_routes) as (keyof typeof _routes)[];
export const routes = _routes as Record<keyof typeof _routes, Route<any>>;