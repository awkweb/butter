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
                import(/* webpackChunkName: 'budgets' */ '../views/Budgets.vue'),
            name: 'Budgets',
            path: '/',
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
                import(/* webpackChunkName: 'inbox' */ '../views/Inbox.vue'),
            name: 'Inbox',
            path: '/inbox',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: () =>
                import(/* webpackChunkName: 'settings' */ '../views/settings/Settings.vue'),
            path: '/settings',
            children: [
                {
                    name: 'SettingsOverview',
                    path: '',
                    component: () =>
                        import(/* webpackChunkName: 'settings-overview' */ '../views/settings/SettingsOverview.vue'),
                },
                {
                    name: 'SettingsBilling',
                    path: 'billing',
                    component: () =>
                        import(/* webpackChunkName: 'settings-billing' */ '../views/settings/SettingsBilling.vue'),
                },
            ],
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
                import(/* webpackChunkName: 'signup' */ '../views/auth/SignUp.vue'),
            name: 'SignUp',
            path: '/signup',
        },
        {
            beforeEnter: beforeEnterIsLoggedOut,
            component: () =>
                import(/* webpackChunkName: 'login' */ '../views/auth/LogIn.vue'),
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
