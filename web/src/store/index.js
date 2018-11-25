import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import budgets from './modules/budgets.store'
import items from './modules/items.store'
import transactions from './modules/transactions.store'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        budgets,
        items,
        transactions,
    },
    state: {},
    actions: {},
    mutations: {},
    getters: {},
})

export default store
