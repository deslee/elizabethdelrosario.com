import React from 'react';
import { RouteProps } from 'react-router';
import Loadable from 'react-loadable'
import FullPageLoading from '../components/FullPageLoading'

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
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        layout: 'Dashboard'
    },
    posts: {
        path: '/admin/posts/:id?',
        component: Loadable({
            loader: () => import('./PostListingPage'),
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
            loader: () => import('./PostListingPage'),
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
            loader: () => import('./AssetsListingPage'),
            loading: () => <FullPageLoading />
        }),
        exact: true,
        authorized: true,
        layout: 'Assets'
    },
    settings: {
        path: '/admin/settings',
        component: Loadable({
            loader: () => import('./SettingsPage'),
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
            loader: () => import('./EditProfilePage'),
            loading: () => <FullPageLoading />
        }),
        layout: 'Profile',
        authorized: true
    }
}
export type RouteKey = keyof typeof _routes;
export const routeKeys = Object.keys(_routes) as (RouteKey)[];
export const routes = _routes as Record<RouteKey, Route>;