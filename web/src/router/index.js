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
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Budgets', '/budgets'),
            name: 'Budgets',
            path: '/',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('Transactions'),
            name: 'Transactions',
            path: '/transactions',
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
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: loadView('LogIn', '/auth'),
            name: 'LogIn',
            path: '/login',
        },
        {
            component: loadView('NotFound'),
            name: 'NotFound',
            path: '*',
        },
    ],
})
