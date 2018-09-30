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
    ],
})
