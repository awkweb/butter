import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import budgets from './modules/budgets.store'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        budgets,
    },
    state: {},
    actions: {},
    mutations: {},
    getters: {},
})

export default store
