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
            component: loadView('index', '/Budgets'),
            name: 'Home',
            path: '/',
        },
        {
            beforeEnter: beforeEnterIsLoggedIn,
            component: loadView('index', '/Budget'),
            name: 'Budget',
            path: '/budgets/:id',
            props: true,
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
