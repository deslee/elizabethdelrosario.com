import DashboardPage from './DashboardPage'
import LoginPage from './LoginPage'
import PostListingPage from './PostListingPage'
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
        path: '/posts',
        component: PostListingPage,
        exact: true,
        authorized: true,
        props: {
            type: 'POST'
        }
    } as Route<typeof PostListingPage>,
    pages: {
        path: '/pages',
        component: PostListingPage,
        exact: true,
        authorized: true,
        props: {
            type: 'PAGE'
        }
    } as Route<typeof PostListingPage>,
    login: {
        path: '/login',
        component: LoginPage,
        exact: true
    }
}
export const routeKeys = Object.keys(_routes) as (keyof typeof _routes)[];
export const routes = _routes as Record<keyof typeof _routes, Route<any>>;