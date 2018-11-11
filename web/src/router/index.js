import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'

import { beforeEnterIsLoggedIn, beforeEnterIsLoggedOut } from '@/utils'

Vue.use(Router)
Vue.use(Meta)

const loadView = (view, path = '') => () =>
    import(/* webpackChunkName: 'view-[request]' */ `@/views${path}/${view}.vue`)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) =>
        savedPosition || { x: 0, y: 0 },
    routes: [
        {
            path: '/',
            redirect: '/budgets',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Budgets', '/budgets'),
            name: 'Budgets',
            path: '/budgets/:id?',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Transactions', '/transactions'),
            name: 'Transactions',
            path: '/transactions/:id?',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Inbox'),
            name: 'Inbox',
            path: '/inbox',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Accounts'),
            name: 'Accounts',
            path: '/accounts',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Settings', '/settings'),
            path: '/settings',
            children: [
                {
                    name: 'SettingsOverview',
                    path: '',
                    component: loadView('SettingsOverview', '/settings'),
                },
                {
                    name: 'SettingsBilling',
                    path: 'billing',
                    component: loadView('SettingsBilling', '/settings'),
                },
            ],
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: loadView('Home'),
            path: '/',
            name: 'Home',
            redirect: '/login',
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: loadView('Register', '/auth'),
            name: 'Register',
            path: '/register',
            props: route => ({ emailParam: route.query.email }),
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: loadView('LogIn', '/auth'),
            name: 'LogIn',
            path: '/login',
            props: route => ({ emailParam: route.query.email }),
        },
        {
            component: loadView('NotFound'),
            name: 'NotFound',
            path: '*',
        },
    ],
})
