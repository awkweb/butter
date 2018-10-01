import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'

import { beforeEnterIsLoggedIn, beforeEnterIsLoggedOut } from '@/utils'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) =>
        savedPosition || { x: 0, y: 0 },
    routes: [
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: () =>
                import(/* webpackChunkName: 'inbox' */ '../views/Inbox.vue'),
            name: 'Inbox',
            path: '/',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: () =>
                import(/* webpackChunkName: 'budgets' */ '../views/Budgets.vue'),
            name: 'Budgets',
            path: '/budgets',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: () =>
                import(/* webpackChunkName: 'transactions' */ '../views/Transactions.vue'),
            name: 'Transactions',
            path: '/transactions',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: () =>
                import(/* webpackChunkName: 'accounts' */ '../views/Accounts.vue'),
            name: 'Accounts',
            path: '/accounts',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: () =>
                import(/* webpackChunkName: 'settings' */ '../views/Settings.vue'),
            name: 'Settings',
            path: '/settings',
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: () =>
                import(/* webpackChunkName: 'home' */ '../views/Home.vue'),
            path: '/',
            name: 'Home',
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: () =>
                import(/* webpackChunkName: 'signup' */ '../views/SignUp.vue'),
            name: 'SignUp',
            path: '/signup',
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: () =>
                import(/* webpackChunkName: 'login' */ '../views/LogIn.vue'),
            name: 'LogIn',
            path: '/login',
        },
        {
            component: () =>
                import(/* webpackChunkName: 'notfound' */ '../views/NotFound.vue'),
            name: 'NotFound',
            path: '*',
        },
    ],
})
