import React from 'react';
import { RouteProps } from 'react-router';
import Loadable from 'react-loadable'

export interface Route extends RouteProps {
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
            loader: () => import('./DashboardPage'),
            loading: () => (<div>Loading</div>)
        }),
        exact: true,
        authorized: true,
        layout: 'Home'
    },
    posts: {
        path: '/admin/posts/:id?',
        component: Loadable({
            loader: () => import('./PostListingPage'),
            loading: () => (<div>Loading</div>)
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
            loader: () => import('./PostListingPage'),
            loading: () => (<div>Loading</div>)
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
            loader: () => import('./AssetsListingPage'),
            loading: () => (<div>Loading</div>)
        }),
        exact: true,
        authorized: true,
        layout: 'Assets'
    },
    settings: {
        path: '/admin/settings',
        component: Loadable({
            loader: () => import('./SettingsPage'),
            loading: () => (<div>Loading</div>)
        }),
        exact: true,
        authorized: true,
        props: {},
        layout: 'Settings'
    },
    profile: {
        path: '/admin/profile',
        component: Loadable({
            loader: () => import('./EditProfilePage'),
            loading: () => (<div>Loading</div>)
        }),
        layout: 'Profile'
    }
}

export const routeKeys = Object.keys(_routes) as (keyof typeof _routes)[];
export const routes = _routes as Record<keyof typeof _routes, Route>;